#!/usr/bin/env bash

echo '==== Step: 1 - Lint ====';

npm run lint

echo '==== Step: 2 - Test ====';

npm run test

echo '==== Step: 3 - Build ====';

npm run build
