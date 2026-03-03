---
description: Read this file to understand how to fetch data in this project.
---

# Data fetching guidelines

This document outlines the best practices and guidelines for fetching data in our Next.js application. Adhering to these guidelines will ensure consistency, performance, and maintainability across the codebase.

## 1. Use server components for data fetching

In Next.js, prefer using server components for data fetching whenever possible. Never use client component to fetch data.

## 2. Data fetching methods

Always use the helper functions in /data directory to fetch data. Never fetch data directly in the components.

All helper functions in /data directory should use drizzle ORM for database interaction.
