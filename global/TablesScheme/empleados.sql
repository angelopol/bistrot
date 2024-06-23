CREATE TABLE `bistrot`.`empleados` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(500) NOT NULL,
    `password` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `user_UNIQUE` (`user` ASC) VISIBLE);