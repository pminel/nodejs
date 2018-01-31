-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: pminel
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `pminel`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `pminel` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pminel`;

--
-- Table structure for table `marcatura`
--

DROP TABLE IF EXISTS `marcatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcatura` (
  `idmarcatura` int(11) NOT NULL AUTO_INCREMENT,
  `idutente` int(11) NOT NULL,
  `idmarcaturatipo` int(11) NOT NULL,
  `giorno` varchar(10) NOT NULL,
  `ora` varchar(5) NOT NULL,
  `stato` varchar(1) NOT NULL DEFAULT 'A',
  `datac` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmarcatura`),
  KEY `fk_marcatura_1_idx` (`idmarcaturatipo`),
  CONSTRAINT `fk_marcatura_1` FOREIGN KEY (`idmarcaturatipo`) REFERENCES `marcaturatipo` (`idmarcaturatipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcatura`
--

LOCK TABLES `marcatura` WRITE;
/*!40000 ALTER TABLE `marcatura` DISABLE KEYS */;
INSERT INTO `marcatura` VALUES (1,1,1,'31/01/2018','16:06','A','2018-01-31 16:06:16','2018-01-31 16:06:16');
/*!40000 ALTER TABLE `marcatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcaturatipo`
--

DROP TABLE IF EXISTS `marcaturatipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcaturatipo` (
  `idmarcaturatipo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(16) NOT NULL,
  `descrizione` varchar(256) NOT NULL,
  `stato` varchar(1) NOT NULL DEFAULT 'A',
  `datac` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmarcaturatipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcaturatipo`
--

LOCK TABLES `marcaturatipo` WRITE;
/*!40000 ALTER TABLE `marcaturatipo` DISABLE KEYS */;
INSERT INTO `marcaturatipo` VALUES (1,'in','Entrata in azienda','A','2018-01-31 13:21:58','2018-01-31 13:21:58'),(2,'out','Uscita dall\'azienda','A','2018-01-31 13:21:58','2018-01-31 13:21:58'),(3,'permesso_in','Entrata dal permesso','A','2018-01-31 13:21:58','2018-01-31 13:21:58'),(4,'permesso_out','Uscita per permesso','A','2018-01-31 13:21:58','2018-01-31 13:21:58');
/*!40000 ALTER TABLE `marcaturatipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password`
--

DROP TABLE IF EXISTS `password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password` (
  `idpassword` int(11) NOT NULL AUTO_INCREMENT,
  `idutente` int(11) NOT NULL,
  `segreto` varchar(64) NOT NULL,
  `stato` varchar(1) NOT NULL DEFAULT 'A',
  `datac` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idpassword`),
  KEY `fk_password_1_idx` (`idutente`),
  CONSTRAINT `fk_password_1` FOREIGN KEY (`idutente`) REFERENCES `utente` (`idutente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password`
--

LOCK TABLES `password` WRITE;
/*!40000 ALTER TABLE `password` DISABLE KEYS */;
INSERT INTO `password` VALUES (1,1,'hFG6ihTXl1PTTLM7UbpGtLAl64E=','A','2018-01-31 09:30:28','2018-01-31 09:30:28');
/*!40000 ALTER TABLE `password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilo`
--

DROP TABLE IF EXISTS `profilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profilo` (
  `idprofilo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(16) NOT NULL,
  `descrizione` varchar(256) NOT NULL,
  `stato` varchar(1) NOT NULL DEFAULT 'A',
  `datac` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofilo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilo`
--

LOCK TABLES `profilo` WRITE;
/*!40000 ALTER TABLE `profilo` DISABLE KEYS */;
INSERT INTO `profilo` VALUES (1,'Admin','Amministratore','A','2018-01-31 09:26:26','2018-01-31 09:26:26'),(2,'User','Utente','A','2018-01-31 09:26:26','2018-01-31 09:26:26');
/*!40000 ALTER TABLE `profilo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utente` (
  `idutente` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `nome` varchar(32) NOT NULL,
  `cognome` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `idprofilo` int(11) NOT NULL,
  `stato` varchar(1) NOT NULL DEFAULT 'A',
  `datac` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idutente`),
  KEY `fk_utente_1_idx` (`idprofilo`),
  CONSTRAINT `fk_utente_1` FOREIGN KEY (`idprofilo`) REFERENCES `profilo` (`idprofilo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (1,'pminel','Paolo','Minel','pminel@gmail.com',1,'A','2018-01-31 09:26:46','2018-01-31 09:31:29');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-31 16:08:43
