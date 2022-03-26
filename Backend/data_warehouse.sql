-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2022 a las 02:02:24
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_warehouse`
--
  CREATE DATABASE IF NOT EXISTS `data_warehouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ;
  USE `data_warehouse` ;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(3) NOT NULL,
  `channel_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `channels`
--

INSERT INTO `channels` (`channel_id`, `channel_name`) VALUES
(1, 'Teléfono'),
(2, 'Whatsapp'),
(3, 'Instagram'),
(4, 'Facebook'),
(5, 'Linkedin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `city_id` int(5) NOT NULL,
  `country_id` int(3) NOT NULL,
  `city_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`city_id`, `country_id`, `city_name`) VALUES
(1, 1, 'Buenos Aires'),
(2, 1, 'Córdoba'),
(3, 1, 'Rosario'),
(4, 2, 'Bogotá'),
(5, 2, 'Cúcuta'),
(6, 2, 'Medellín'),
(7, 3, 'Atacama'),
(8, 3, 'Santiago'),
(9, 3, 'Valparaíso'),
(10, 4, 'Canelones'),
(11, 4, 'Maldonado'),
(12, 4, 'Montevideo'),
(13, 5, 'Ciudad de México'),
(14, 5, 'Tijuana'),
(15, 6, 'Florida'),
(16, 6, 'Texas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `company_id` int(3) NOT NULL,
  `company_name` varchar(64) NOT NULL,
  `city_id` int(3) NOT NULL,
  `address` varchar(64) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `telephone` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `city_id`, `address`, `email`, `telephone`) VALUES
(1, 'Jedis URL', 1, 'Coruscant 1967', 'jedis@altoconsejo.com', '2234238653'),
(2, 'C.A.Colón', 3, 'Juan José Paso 3535', 'info@clubcolon.com.ar', '2234238653'),
(3, 'Death Star', 2, 'Sarmiento 2226', 'deathstar@info.com', '2234238653'),
(4, 'Soda Stereo SA ', 4, 'Entre Canibales 2854', 'soda@stereo.com', '2234238653'),
(5, 'Mate Dulce', 16, 'Criollitos 4567', 'matienzo@dulce.com', '2234238653');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(3) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `city_id` int(5) NOT NULL,
  `company_id` int(3) NOT NULL,
  `position` varchar(32) NOT NULL,
  `interest` int(3) NOT NULL,
  `address` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`contact_id`, `firstname`, `lastname`, `email`, `city_id`, `company_id`, `position`, `interest`, `address`) VALUES
(1, 'Luis', 'Rodriguez', 'pr10@gmail.com', 14, 2, 'Enganche', 100, 'JJ Paso 3535'),
(2, 'Gustavo', 'Cerati', 'sodastereo@yahoo.com', 13, 4, 'Vocalista', 100, 'Entre Canibales 2254'),
(3, 'Han', 'Solo', 'falcon@gmail.com', 8, 3, 'Contrabandista', 50, 'Milennium 1025'),
(4, 'Facundo', 'Farias', 'lajoya@gmail.com', 1, 2, 'Delantero', 50, 'JJ Paso 3535'),
(5, 'Albus', 'Dumbledore', 'albusdumbledore@yahoo.com', 12, 5, 'Headmaster', 75, 'Balcarce 567'),
(6, 'Mace', 'Windu', 'masterwindu@gmail.com', 2, 1, 'Master', 25, 'No Anakin 3562'),
(7, 'Hector', 'Bosio', 'zetabosio@gmail.com', 3, 4, 'Bajista', 75, 'Entre Canibales 2254'),
(8, 'Christian', 'Bernardi', 'cordobes@gmail.com', 1, 2, 'Volante', 0, 'JJ Paso 3535'),
(9, 'Din', 'Djarin', 'grogu@gmail', 6, 3, 'Caza', 0, 'Mandalore 35261987'),
(10, 'Carlos', 'Ficicchia', 'charlyalberti@gmail.com', 16, 4, 'Batería', 25, 'Entre Canibales 2254'),
(11, 'Leonardo', 'Burian', 'cachorro@gmail.com', 2, 2, 'Arquero', 100, 'JJ Paso 3535'),
(12, 'Ahsoka', 'Tano', 'sabionda@gmail.com', 7, 1, 'Padawan', 75, 'Shilli 3245');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts_channels`
--

CREATE TABLE `contacts_channels` (
  `contact_id` int(3) NOT NULL,
  `channel_id` int(3) NOT NULL,
  `user_account` varchar(64) NOT NULL,
  `preference` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts_channels`
--

INSERT INTO `contacts_channels` (`contact_id`, `channel_id`, `user_account`, `preference`) VALUES
(0, 0, '', NULL),
(2, 1, '2234238653', 'Canal favorito'),
(3, 3, '@hansolo', 'No molestar'),
(3, 5, 'https://www.linkedin.com/in/hansolo', 'Canal favorito'),
(4, 1, '2234238653', 'Canal favorito'),
(4, 4, 'https://www.facebook.com/facufarias', 'Sin preferencia'),
(5, 1, '2234238653', 'Canal favorito'),
(6, 2, '2234238653', 'No molestar'),
(7, 1, '2234238653', 'Canal favorito'),
(8, 1, '2234238653', 'No molestar'),
(8, 3, '@chrisbernardi', 'Sin preferencia'),
(9, 1, '2234238653', 'Canal favorito'),
(10, 3, '@charlyalberti', 'Canal favorito'),
(11, 1, '2234238653', 'Sin preferencia'),
(11, 2, '2234238653', 'Canal favorito'),
(12, 3, '@ahsokatano', 'No molestar'),
(12, 5, 'https://www.linkedin.com/in/ahsokatano', 'Canal favorito');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `country_id` int(3) NOT NULL,
  `region_id` int(3) NOT NULL,
  `country_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`country_id`, `region_id`, `country_name`) VALUES
(1, 1, 'Argentina'),
(2, 1, 'Colombia'),
(3, 1, 'Chile'),
(4, 1, 'Uruguay'),
(5, 2, 'México'),
(6, 2, 'Estados Unidos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `region_id` int(3) NOT NULL,
  `region_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`region_id`, `region_name`) VALUES
(1, 'Sudamérica'),
(2, 'Norteamérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(3) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(65) NOT NULL,
  `perfil` enum('Admin','Básico') NOT NULL DEFAULT 'Básico',
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `perfil`, `password`) VALUES
(1, 'maxi', 'Vargas', 'maxi@gmail.com', 'Admin', '1234'),
(2, 'Pulga', 'Rodriguez', 'cr10@hotmail.com', 'Básico', '1234'),
(3, 'Gustavo ', 'Cerati', 'sodastero@yahoo.com', 'Básico', '123a'),
(4, 'Han', 'Solo', 'falcon@hotmail.com', 'Básico', '123a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `cities_ibfk_1` (`country_id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indices de la tabla `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD PRIMARY KEY (`contact_id`,`channel_id`),
  ADD KEY `channel_id` (`channel_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD KEY `countries_ibfk_1` (`region_id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`region_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `channels`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `regions`
--
ALTER TABLE `regions`
  MODIFY `region_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
