#!/usr/bin/env bun

import fs from "node:fs";
import { multiPassOptimizePath } from "./optimize.ts";

console.log(multiPassOptimizePath(String(fs.readFileSync(0))));
