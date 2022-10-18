#!/bin/bash

npm run migration:run
npm run db:test:prepare
npm run test:e2e
