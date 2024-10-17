#!/usr/bin/env bun

import { optimizeSVGPath } from "./src";
import fs from 'node:fs';

console.log(optimizeSVGPath(String(fs.readFileSync(0))));
