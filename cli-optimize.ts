#!/usr/bin/env bun

import fs from 'node:fs';
import { multiPassOptimizePath } from "./src/optimize";

console.log(multiPassOptimizePath(String(fs.readFileSync(0))));
