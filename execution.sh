#!/bin/bash

function run_tests()
{
    cypress run --browser chrome --headless --reporter mochawesome
    cypress run --browser firefox --headless --reporter mochawesome
}

run_tests