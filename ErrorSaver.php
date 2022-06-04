<?php

file_put_contents('log.txt', file_get_contents('log.txt') . $_POST["error"][0]."\n");
