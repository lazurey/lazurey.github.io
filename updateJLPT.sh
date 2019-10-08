#!/bin/bash
git submodule update --remote
git add .
git ci 'update jlpt test simulator'
git status
