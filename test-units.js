/**
 * test-units.js
 * Verification of core game modules, storage, physics, collision, and ad compliance.
 */

import { FRUIT_TYPES } from './src/game/Fruit.js';
import { Collision } from './src/game/Collision.js';
import { Physics } from './src/game/Physics.js';
import { ScoreStorage } from './src/storage/ScoreStorage.js';
import { AdManager } from './src/ads/AdManager.js';
import * as THREE from 'three';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('🧪 Starting Fruit Slice Rush Unit & Logic Verification...\n');

// 1. Verify Fruit Types & Configurations
console.log('1. FRUIT TYPES SPECIFICATION:');
const expectedFruits = [
  'WATERMELON',
  'ORANGE',
  'APPLE',
  'KIWI',
  'BANANA',
  'PINEAPPLE',
  'STRAWBERRY',
  'BOMB'
];

expectedFruits.forEach(key => {
  const f = FRUIT_TYPES[key];
  assert(!!f, `Fruit config for ${key} exists`);
  assert(typeof f.radius === 'number' && f.radius > 0, `${key} has positive radius (${f?.radius})`);
  assert(typeof f.juiceColor === 'string', `${key} has juiceColor (${f?.juiceColor})`);
  assert(typeof f.particles === 'number' && f.particles > 0, `${key} has particle count (${f?.particles})`);
});
assert(FRUIT_TYPES.BOMB.isBomb === true, 'BOMB is correctly flagged as isBomb');

// 2. ScoreStorage Persistence & Schema
console.log('\n2. LOCALSTORAGE & SCORE STORAGE:');
// Mock localStorage in Node
const mockStore = {};
globalThis.localStorage = {
  getItem: (k) => mockStore[k] || null,
  setItem: (k, v) => { mockStore[k] = v.toString(); },
  removeItem: (k) => { delete mockStore[k]; },
  clear: () => { Object.keys(mockStore).forEach(k => delete mockStore[k]); }
};

ScoreStorage.resetScores();
assert(ScoreStorage.getHighScore('classic') === 0, 'Initial classic high score is 0');
assert(ScoreStorage.getHighScore('time-attack') === 0, 'Initial time-attack high score is 0');

const isNewRecord = ScoreStorage.saveScore('classic', 150);
assert(isNewRecord === true, 'Saving 150 marks isNewRecord true');
assert(ScoreStorage.getHighScore('classic') === 150, 'Classic high score saved as 150');

const isLowerScore = ScoreStorage.saveScore('classic', 90);
assert(isLowerScore === false, 'Saving 90 does not overwrite high score');
assert(ScoreStorage.getHighScore('classic') === 150, 'High score remains 150');

ScoreStorage.updateCombo(5);
assert(ScoreStorage.getHighestCombo() === 5, 'Highest combo saved as 5');
ScoreStorage.updateCombo(3);
assert(ScoreStorage.getHighestCombo() === 5, 'Lower combo does not overwrite 5');

ScoreStorage.incrementSliced(12);
ScoreStorage.incrementSliced(8);
assert(ScoreStorage.getTotalSliced() === 20, 'Total sliced increments correctly to 20');

// 3. Settings persistence
console.log('\n3. SETTINGS STORAGE:');
const defaultSettings = ScoreStorage.getSettings();
assert(defaultSettings.soundEnabled === true, 'Default sound is enabled');
assert(defaultSettings.quality === 'high', 'Default quality is high');

ScoreStorage.saveSettings({ sfxVolume: 0.65, quality: 'medium' });
const updatedSettings = ScoreStorage.getSettings();
assert(updatedSettings.sfxVolume === 0.65, 'sfxVolume persisted as 0.65');
assert(updatedSettings.quality === 'medium', 'quality persisted as medium');

// 4. Collision Detection Math
console.log('\n4. COLLISION DETECTION:');
const mockCamera = new THREE.PerspectiveCamera(52, 1280 / 800, 0.1, 100);
mockCamera.position.set(0, 0, 24);
mockCamera.updateProjectionMatrix();

// Mock Fruit positioned at center of camera view (0, 0, 0)
const mockFruit = {
  position: new THREE.Vector3(0, 0, 0),
  radius: 1.45,
  isSliced: false,
  isDead: false
};

// Mock window dimensions
globalThis.window = {
  innerWidth: 1280,
  innerHeight: 800
};

// Swipe cutting directly through screen center (x=640, y=400)
const p1Through = { x: 500, y: 400 };
const p2Through = { x: 780, y: 400 };
const hit = Collision.checkSwipeCollision(p1Through, p2Through, mockFruit, mockCamera);
assert(hit === true, 'Swipe line cutting through center detects collision');

// Swipe far away in corner (x=100, y=100 to x=200, y=100)
const p1Miss = { x: 100, y: 100 };
const p2Miss = { x: 200, y: 100 };
const miss = Collision.checkSwipeCollision(p1Miss, p2Miss, mockFruit, mockCamera);
assert(miss === false, 'Swipe away in corner does not trigger false collision');

// Sliced fruit should not register collisions again
mockFruit.isSliced = true;
const hitAfterSliced = Collision.checkSwipeCollision(p1Through, p2Through, mockFruit, mockCamera);
assert(hitAfterSliced === false, 'Already sliced fruit does not trigger duplicate hit');

// 5. Physics Impulse and Flight
console.log('\n5. PHYSICS & TRAJECTORY CALCULATIONS:');
const dummyObj = {
  position: new THREE.Vector3(0, 0, 0),
  velocity: new THREE.Vector3(5, 20, 0),
  rotation: new THREE.Euler(0, 0, 0),
  angularVelocity: new THREE.Vector3(1, 2, 0)
};

Physics.update(dummyObj, 0.1);
assert(dummyObj.position.x > 0, `Physics moved X position forward (${dummyObj.position.x})`);
assert(dummyObj.position.y > 0, `Physics moved Y position upward (${dummyObj.position.y})`);
assert(dummyObj.velocity.y < 20, `Gravity reduced upward velocity (${dummyObj.velocity.y} < 20)`);

// Slice impulse separation
const halfA = { velocity: new THREE.Vector3(0, 0, 0), angularVelocity: new THREE.Vector3(0, 0, 0) };
const halfB = { velocity: new THREE.Vector3(0, 0, 0), angularVelocity: new THREE.Vector3(0, 0, 0) };
Physics.applySliceImpulse(halfA, halfB, new THREE.Vector2(1, 0));
assert(halfA.velocity.y > 0, 'Half A propelled along cut normal');
assert(halfB.velocity.y < 0, 'Half B propelled opposite direction');

// 6. AdManager Compliance Rules
console.log('\n6. ADVERTISING MONETIZATION ARCHITECTURE & COMPLIANCE:');
const adManager = new AdManager();
assert(adManager.isConfigured === false, 'AdManager is unconfigured by default');
assert(adManager.isRewardedAvailable() === false, 'Rewarded ads not available without real provider');

let interstitialDone = false;
adManager.showInterstitial(() => { interstitialDone = true; });
assert(interstitialDone === true, 'Unmonetized interstitial gracefully invokes onComplete callback');

let rewardedDismissed = false;
adManager.showRewarded({
  onReward: () => {},
  onDismiss: (reason) => { rewardedDismissed = true; }
});
assert(rewardedDismissed === true, 'Rewarded ad does not grant free reward without real provider confirmation');

console.log('\n===========================================');
console.log(`TOTAL TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('===========================================');

process.exit(failed > 0 ? 1 : 0);

