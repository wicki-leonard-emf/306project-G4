/**
 * Test Suite for SensorHub API Endpoints
 * Tests all available endpoints: Auth, Users, Rooms, Sensors, and Readings
 *
 * Usage: node test-endpoints.js
 *
 * Configuration:
 * - BASE_URL: API server URL (default: http://localhost:3000)
 * - API_KEY: X-API-Key for sensor readings (default: test-api-key)
 */

import http from 'http';
import https from 'https';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.API_KEY || 'test-api-key';
const IS_HTTPS = BASE_URL.startsWith('https');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Helper function to make HTTP requests
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const protocol = IS_HTTPS ? https : http;
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
            rawBody: data,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: null,
            rawBody: data,
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Log helper functions
function logSection(title) {
  console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
}

function logTest(name, status, statusCode) {
  const statusText = status === 'PASS' ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
  console.log(`${statusText} | ${name} (${statusCode})`);
}

function logError(error) {
  console.log(`${colors.red}Error: ${error}${colors.reset}`);
}

function logInfo(info) {
  console.log(`${colors.cyan}ℹ ${info}${colors.reset}`);
}

// Store cookies and user data for authenticated requests
let sessionCookie = null;
let testUserId = null;
let testRoomId = null;
let testSensorId = null;

// Store created resources for cleanup
const createdResources = {
  roomIds: [],
  sensorIds: [],
  userIds: [],
};

// Cleanup function to delete test data
async function cleanupTestData() {
  logSection('CLEANUP: Removing test data');

  let cleanedCount = 0;

  // Delete created rooms (which will cascade delete sensors and readings)
  for (const roomId of createdResources.roomIds) {
    try {
      const response = await makeRequest('DELETE', `/api/rooms/${roomId}`);
      if (response.status === 200 || response.status === 204) {
        logInfo(`Deleted room: ${roomId}`);
        cleanedCount++;
      }
    } catch (error) {
      console.log(`${colors.yellow}Could not delete room ${roomId}${colors.reset}`);
    }
  }

  // Delete created sensors
  for (const sensorId of createdResources.sensorIds) {
    try {
      const response = await makeRequest('DELETE', `/api/sensors/${sensorId}`);
      if (response.status === 200 || response.status === 204) {
        logInfo(`Deleted sensor: ${sensorId}`);
        cleanedCount++;
      }
    } catch (error) {
      console.log(`${colors.yellow}Could not delete sensor ${sensorId}${colors.reset}`);
    }
  }

  // Delete created users
  const headers = sessionCookie ? { Cookie: sessionCookie } : {};
  for (const userId of createdResources.userIds) {
    try {
      const response = await makeRequest('DELETE', `/api/users/${userId}`, null, headers);
      if (response.status === 200 || response.status === 204) {
        logInfo(`Deleted user: ${userId}`);
        cleanedCount++;
      }
    } catch (error) {
      console.log(`${colors.yellow}Could not delete user ${userId}${colors.reset}`);
    }
  }

  console.log(`\n${colors.cyan}Cleanup completed: ${cleanedCount} resources deleted${colors.reset}\n`);
}

// Test Suite
const tests = {
  // ==================== ROOMS TESTS ====================
  async testCreateRoom() {
    logSection('TEST: POST /api/rooms (Create Room)');

    const payload = {
      name: `TestRoom-${Date.now()}`,
      description: 'Test classroom with sensors',
      sensors: [
        { serialNumber: `TEMP-${Date.now()}`, type: 'TEMPERATURE' },
        { serialNumber: `HUM-${Date.now()}`, type: 'HUMIDITY' },
      ],
    };

    try {
      const response = await makeRequest('POST', '/api/rooms', payload);
      logTest('Create Room', response.status === 201 ? 'PASS' : 'FAIL', response.status);

      if (response.body?.room?.id) {
        testRoomId = response.body.room.id;
        createdResources.roomIds.push(testRoomId);
        logInfo(`Created room: ${testRoomId}`);
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 201;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testGetRooms() {
    logSection('TEST: GET /api/rooms (List All Rooms)');

    try {
      const response = await makeRequest('GET', '/api/rooms');
      logTest('Get Rooms', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      if (Array.isArray(response.body)) {
        logInfo(`Found ${response.body.length} rooms`);
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2).substring(0, 500)}...\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testGetRoomById() {
    logSection('TEST: GET /api/rooms/:id (Get Room Details)');

    if (!testRoomId) {
      logError('No test room ID available');
      return false;
    }

    try {
      const response = await makeRequest('GET', `/api/rooms/${testRoomId}`);
      logTest('Get Room by ID', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  // ==================== SENSORS TESTS ====================
  async testGetSensors() {
    logSection('TEST: GET /api/sensors (List All Sensors)');

    try {
      const response = await makeRequest('GET', '/api/sensors');
      logTest('Get Sensors', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      if (response.body?.sensors?.length > 0) {
        logInfo(`Found ${response.body.sensors.length} sensors`);
        testSensorId = response.body.sensors[0].id;
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2).substring(0, 500)}...\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testCreateSensor() {
    logSection('TEST: POST /api/sensors (Create Sensor)');

    if (!testRoomId) {
      logError('No test room ID available');
      return false;
    }

    const payload = {
      roomId: testRoomId,
      type: 'TEMPERATURE',
      serialNumber: `PHIDGET-TEMP-${Date.now()}`,
    };

    try {
      const response = await makeRequest('POST', '/api/sensors', payload);
      logTest('Create Sensor', response.status === 201 ? 'PASS' : 'FAIL', response.status);

      if (response.body?.sensor?.id) {
        testSensorId = response.body.sensor.id;
        createdResources.sensorIds.push(testSensorId);
        logInfo(`Created sensor: ${testSensorId}`);
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 201;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  // ==================== READINGS TESTS ====================
  async testPostSingleReading() {
    logSection('TEST: POST /api/sensors/readings (Submit Single Reading)');

    const payload = {
      serialNumber: `PHIDGET-TEMP-${Date.now()}`,
      value: 22.5,
    };

    try {
      const response = await makeRequest('POST', '/api/sensors/readings', payload, {
        'X-API-Key': API_KEY,
      });

      logTest('Post Single Reading', response.status === 201 ? 'PASS' : 'FAIL', response.status);
      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 201;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testPostBatchReadings() {
    logSection('TEST: POST /api/rooms/:roomId/readings (Submit Batch Readings)');

    if (!testRoomId) {
      logError('No test room ID available');
      return false;
    }

    const payload = {
      readings: [
        { serialNumber: `PHIDGET-TEMP-${Date.now()}`, value: 23.5 },
        { serialNumber: `PHIDGET-HUM-${Date.now()}`, value: 48.2 },
      ],
    };

    try {
      const response = await makeRequest('POST', `/api/rooms/${testRoomId}/readings`, payload, {
        'X-API-Key': API_KEY,
      });

      logTest('Post Batch Readings', response.status === 201 ? 'PASS' : 'FAIL', response.status);
      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 201;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  // ==================== AUTHENTICATION TESTS ====================
  async testLogin() {
    logSection('TEST: POST /api/auth/login (User Login)');

    const payload = {
      email: 'admin@school.ch',
      password: 'password123',
    };

    try {
      const response = await makeRequest('POST', '/api/auth/login', payload);
      logTest('Login', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      // Extract session cookie
      if (response.headers['set-cookie']) {
        const cookieHeader = response.headers['set-cookie'][0];
        const sessionMatch = cookieHeader.match(/connect\.sid=[^;]+/);
        if (sessionMatch) {
          sessionCookie = sessionMatch[0];
          logInfo(`Session cookie obtained: ${sessionCookie.substring(0, 30)}...`);
        }
      }

      if (response.body?.user?.id) {
        testUserId = response.body.user.id;
        // Only track if it's a test user (not admin user)
        if (response.body.user.email && response.body.user.email.includes('test')) {
          createdResources.userIds.push(testUserId);
        }
        logInfo(`Logged in as: ${response.body.user.email}`);
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testGetCurrentUser() {
    logSection('TEST: GET /api/auth/me (Get Current User)');

    const headers = sessionCookie ? { Cookie: sessionCookie } : {};

    try {
      const response = await makeRequest('GET', '/api/auth/me', null, headers);
      logTest('Get Current User', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testLogout() {
    logSection('TEST: POST /api/auth/logout (User Logout)');

    const headers = sessionCookie ? { Cookie: sessionCookie } : {};

    try {
      const response = await makeRequest('POST', '/api/auth/logout', null, headers);
      logTest('Logout', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  // ==================== USERS TESTS ====================
  async testGetUsers() {
    logSection('TEST: GET /api/users (List All Users - Admin Only)');

    const headers = sessionCookie ? { Cookie: sessionCookie } : {};

    try {
      const response = await makeRequest('GET', '/api/users', null, headers);
      logTest('Get Users', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      if (Array.isArray(response.body)) {
        logInfo(`Found ${response.body.length} users`);
      }

      console.log(`Response: ${JSON.stringify(response.body, null, 2).substring(0, 500)}...\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testGetUserById() {
    logSection('TEST: GET /api/users/:id (Get User by ID - Admin Only)');

    if (!testUserId) {
      logError('No test user ID available');
      return false;
    }

    const headers = sessionCookie ? { Cookie: sessionCookie } : {};

    try {
      const response = await makeRequest('GET', `/api/users/${testUserId}`, null, headers);
      logTest('Get User by ID', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testUpdateUser() {
    logSection('TEST: PUT /api/users/:id (Update User Role - Admin Only)');

    if (!testUserId) {
      logError('No test user ID available');
      return false;
    }

    const payload = { role: 'ENSEIGNANT' };
    const headers = sessionCookie ? { Cookie: sessionCookie } : {};

    try {
      const response = await makeRequest('PUT', `/api/users/${testUserId}`, payload, headers);
      logTest('Update User', response.status === 200 ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return response.status === 200;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  // ==================== ERROR CASES ====================
  async testInvalidLogin() {
    logSection('TEST: Invalid Login (Error Case)');

    const payload = {
      email: 'invalid@school.ch',
      password: 'wrongpassword',
    };

    try {
      const response = await makeRequest('POST', '/api/auth/login', payload);
      const isExpectedError = response.status === 400 || response.status === 401;
      logTest('Invalid Login Returns Error', isExpectedError ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return isExpectedError;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testMissingAPIKey() {
    logSection('TEST: Missing API Key (Error Case)');

    const payload = { serialNumber: 'PHIDGET-TEMP-001', value: 22.5 };

    try {
      // Make request WITHOUT API key
      const response = await makeRequest('POST', '/api/sensors/readings', payload);
      const isExpectedError = response.status === 401;
      logTest('Missing API Key Returns 401', isExpectedError ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return isExpectedError;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },

  async testInvalidRoomId() {
    logSection('TEST: Invalid Room ID (Error Case)');

    try {
      const response = await makeRequest('GET', '/api/rooms/invalid-room-id');
      const isExpectedError = response.status === 404;
      logTest('Invalid Room ID Returns 404', isExpectedError ? 'PASS' : 'FAIL', response.status);

      console.log(`Response: ${JSON.stringify(response.body, null, 2)}\n`);
      return isExpectedError;
    } catch (error) {
      logError(error.message);
      return false;
    }
  },
};

// Main test execution
async function runAllTests() {
  console.clear();
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║        SensorHub API - Complete Endpoint Test Suite     ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.yellow}Base URL: ${BASE_URL}${colors.reset}\n`);

  const results = [];

  // Run tests in order
  results.push(['Create Room', await tests.testCreateRoom()]);
  results.push(['Get Rooms', await tests.testGetRooms()]);
  results.push(['Get Room by ID', await tests.testGetRoomById()]);
  results.push(['Get Sensors', await tests.testGetSensors()]);
  results.push(['Create Sensor', await tests.testCreateSensor()]);
  results.push(['Post Single Reading', await tests.testPostSingleReading()]);
  results.push(['Post Batch Readings', await tests.testPostBatchReadings()]);
  results.push(['Login', await tests.testLogin()]);
  results.push(['Get Current User', await tests.testGetCurrentUser()]);
  results.push(['Get Users (Admin)', await tests.testGetUsers()]);
  results.push(['Get User by ID (Admin)', await tests.testGetUserById()]);
  results.push(['Update User (Admin)', await tests.testUpdateUser()]);
  results.push(['Logout', await tests.testLogout()]);
  results.push(['Invalid Login (Error)', await tests.testInvalidLogin()]);
  results.push(['Missing API Key (Error)', await tests.testMissingAPIKey()]);
  results.push(['Invalid Room ID (Error)', await tests.testInvalidRoomId()]);

  // Summary
  logSection('TEST SUMMARY');
  const passed = results.filter(([_, result]) => result).length;
  const total = results.length;

  console.log(`${colors.cyan}Test Results:${colors.reset}\n`);
  results.forEach(([name, passed]) => {
    const status = passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    console.log(`  ${status} ${name}`);
  });

  console.log(`\n${colors.cyan}Summary:${colors.reset}`);
  console.log(`  ${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`  ${colors.red}Failed: ${total - passed}${colors.reset}`);
  console.log(`  Total: ${total}\n`);

  const passRate = Math.round((passed / total) * 100);
  const statusColor = passRate === 100 ? colors.green : passRate >= 80 ? colors.yellow : colors.red;
  console.log(`${statusColor}Pass Rate: ${passRate}%${colors.reset}\n`);

  // Cleanup test data
  await cleanupTestData();

  process.exit(passRate === 100 ? 0 : 1);
}

// Handle errors and run tests
runAllTests().catch((error) => {
  console.error(`${colors.red}Fatal Error:${colors.reset}`, error);
  process.exit(1);
});
