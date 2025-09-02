#!/usr/bin/env bun

import fs from "node:fs";
import { multiPassOptimizePath } from "./optimize";

console.log(multiPassOptimizePath(String(fs.readFileSync(0))));
