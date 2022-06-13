<?php
/**
 * @author: Šimon Cerman
 * for testing purpose only
 */
file_put_contents('log.txt', file_get_contents('log.txt') . $_POST["error"]."\n");
