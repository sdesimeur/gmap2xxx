-- phpMyAdmin SQL Dump
-- version 4.1.14.8
-- http://www.phpmyadmin.net
--
-- Host: db628290532.db.1and1.com
-- Generation Time: Jun 03, 2016 at 10:23 PM
-- Server version: 5.5.49-0+deb7u1-log
-- PHP Version: 5.4.45-0+deb7u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db628290532`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cookies`
--

CREATE TABLE IF NOT EXISTS `Cookies` (
  `id4identities` int(11) NOT NULL,
  `typeext` varchar(8) COLLATE latin1_general_ci DEFAULT NULL,
  `extrawpts` tinyint(1) DEFAULT NULL,
  `extratrk` tinyint(1) DEFAULT NULL,
  `fname` varchar(30) COLLATE latin1_general_ci DEFAULT NULL,
  `ename` varchar(30) COLLATE latin1_general_ci DEFAULT NULL,
  `sendtype` varchar(8) COLLATE latin1_general_ci DEFAULT NULL,
  `del1step0` tinyint(1) DEFAULT NULL,
  `del1step1` tinyint(1) DEFAULT NULL,
  KEY `id4identities` (`id4identities`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Errors`
--

CREATE TABLE IF NOT EXISTS `Errors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `error` varchar(256) COLLATE latin1_general_ci DEFAULT NULL,
  `sqltxt` varchar(5096) COLLATE latin1_general_ci DEFAULT NULL,
  `ndate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `RequestsIds`
--

CREATE TABLE IF NOT EXISTS `RequestsIds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(32) COLLATE latin1_general_ci DEFAULT NULL,
  `useragent` varchar(512) COLLATE latin1_general_ci DEFAULT NULL,
  `ndate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=398 ;

-- --------------------------------------------------------

--
-- Table structure for table `RequestsUrls`
--

CREATE TABLE IF NOT EXISTS `RequestsUrls` (
  `id4identities` int(11) NOT NULL,
  `url` varchar(2048) COLLATE latin1_general_ci DEFAULT NULL,
  `del1step` tinyint(1) DEFAULT NULL,
  `errorjson` tinyint(1) DEFAULT NULL,
  `errorjson2` tinyint(1) DEFAULT NULL,
  KEY `id4identities` (`id4identities`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE IF NOT EXISTS `Sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `token` varchar(2048) COLLATE latin1_general_ci NOT NULL,
  `ndate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=34 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cookies`
--
ALTER TABLE `Cookies`
  ADD CONSTRAINT `Cookies_ibfk_1` FOREIGN KEY (`id4identities`) REFERENCES `RequestsIds` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `RequestsUrls`
--
ALTER TABLE `RequestsUrls`
  ADD CONSTRAINT `RequestsUrls_ibfk_1` FOREIGN KEY (`id4identities`) REFERENCES `RequestsIds` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
