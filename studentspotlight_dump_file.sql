-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 05. 21:19
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `studentspotlight`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `attendance`
--
USE studentspotlight;

CREATE TABLE `attendance` (
  `AttendanceID` int(11) NOT NULL,
  `ScheduleID` int(11) DEFAULT NULL,
  `StudentID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Status` enum('present','absent') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `classes`
--

CREATE TABLE `classes` (
  `ClassID` int(11) NOT NULL,
  `ClassName` varchar(255) NOT NULL,
  `SchoolID` int(11) DEFAULT NULL,
  `HeadTeacherID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `classes`
--

INSERT INTO `classes` (`ClassID`, `ClassName`, `SchoolID`, `HeadTeacherID`) VALUES
(3, '11.B', 3, 17),
(4, '11.C', 3, 19),
(5, '12/D', 4, 50),
(6, '12/A', 4, 51);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `documents`
--

CREATE TABLE `documents` (
  `DocumentID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Content` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `grades`
--

CREATE TABLE `grades` (
  `GradeID` int(11) NOT NULL,
  `StudentID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `TeacherID` int(11) DEFAULT NULL,
  `Grade` float DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `notifications`
--

CREATE TABLE `notifications` (
  `NotificationID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `DateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `omission`
--

CREATE TABLE `omission` (
  `OmissionID` int(11) NOT NULL,
  `StudentID` int(11) DEFAULT NULL,
  `TeacherID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Image` blob DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schedule`
--

CREATE TABLE `schedule` (
  `ScheduleID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `ClassID` int(11) DEFAULT NULL,
  `DayOfWeek` varchar(1) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `HeadTeacher` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schools`
--

CREATE TABLE `schools` (
  `SchoolID` int(11) NOT NULL,
  `SchoolName` varchar(255) NOT NULL,
  `SchoolIdentifier` varchar(50) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `SchoolLevel` varchar(50) DEFAULT NULL,
  `EducationLevel` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `schools`
--

INSERT INTO `schools` (`SchoolID`, `SchoolName`, `SchoolIdentifier`, `Address`, `SchoolLevel`, `EducationLevel`) VALUES
(2, 'Budapesti Műszaki Szakképzési Centrum Újpesti Két Tanítási Nyelvű Műszaki Technikum', '203058/005', 'Újpest Görgey Artúr út 26. 1041', NULL, NULL),
(3, 'Bolyai János Műszaki Technikum és Kollégium', '203058/003', 'Budapest Váci út 21.', NULL, NULL),
(4, 'Bláthy Ottó Titusz Informatikai Technikum', ' 203058/002', 'Budapest, Bécsi út 134, 1032', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subjectassignments`
--

CREATE TABLE `subjectassignments` (
  `AssignmentID` int(11) NOT NULL,
  `TeacherID` int(11) DEFAULT NULL,
  `Subject` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `subjectassignments`
--

INSERT INTO `subjectassignments` (`AssignmentID`, `TeacherID`, `Subject`) VALUES
(1, 14, '1'),
(2, 13, '3'),
(3, 4, '5'),
(4, 13, '4'),
(5, 4, '6'),
(6, 4, '3'),
(7, 17, '1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subjects`
--

CREATE TABLE `subjects` (
  `CourseID` int(11) NOT NULL,
  `CourseName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `subjects`
--

INSERT INTO `subjects` (`CourseID`, `CourseName`) VALUES
(1, 'Math'),
(2, 'Geography'),
(3, 'Physics'),
(4, 'History'),
(5, 'PE'),
(6, 'IT');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `UserType` enum('student','teacher','schooladmin','systemadmin') NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `OmissionFK` int(11) DEFAULT NULL,
  `ClassID` int(11) DEFAULT NULL,
  `BirthDate` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`UserID`, `Username`, `PasswordHash`, `UserType`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `OmissionFK`, `ClassID`, `BirthDate`) VALUES
(2, 'rendszergazda', '$2b$10$N5TumPGqqda1P5Wbh7.GV.4ywllbAhhO.D8noYsPAzKaigO1DYfVm', 'systemadmin', '', '', NULL, NULL, NULL, NULL, NULL),
(3, '1.1.00.3', '$2b$10$tJ4.bwT63XbSBfbAeEoFP.1n6VnDKUtdMUgVZc70gkHcKRj6IIzS6', 'student', 'Valaki', 'Valaki', 'asd@gmail.com', '06201234567', NULL, NULL, '2000-10-10'),
(4, '1.2.00.4', '$2b$10$yQkdS2vt0bJwKv4KLoJIT.rNc.Ed7KyNFlvcRPCsnoZ2u.LZKUjOu', 'teacher', 'Travis', 'Scott', 'travis.scott@gmail.com', '109998766', NULL, NULL, '2000-10-10'),
(5, '203058/005', '$2b$10$lJXEWqS1lbOxIekl1z9JK.piA0RdrSgmP7Yw9MXfN.787N0l6tXN6', 'schooladmin', '', '', NULL, NULL, NULL, NULL, NULL),
(6, '5.2.00.6', '$2b$10$xVBopzZfxlt8EaRzgzfqk.R7PFgBOBThlrw.H/ug99ELM0pmq7Ho6', 'teacher', 'Marco', 'Marijan', 'marco.marijan@gmail.com', '06701111234', NULL, NULL, '2000-10-10'),
(7, '5.1.00.7', '$2b$10$kftuobvqgYHyLoFVO5PouO3Ib4pA2Um5R5Bz6HGdV5mYoX.ZgVr1C', 'student', 'Marques', 'Tinek', 'marques.tinek@gmail.com', '06701111235', NULL, NULL, '2000-10-10'),
(8, '1.1.00.8', '$2b$10$cKdbV/o5U8wTjTmzzgHU/Ok5W2A6lWNFKYjr03sHtmi2plyVuYe8e', 'student', 'Benett', 'Marco', 'benett.marco@gmail.com', '06109998765', NULL, NULL, '2000-01-01'),
(9, '1.1.00.9', '$2b$10$9XQza7Xk5rQXhnnpnRv6Ge4NugHurfNN049QR4vWT.Z.0zzQ7xccS', 'student', 'Pilypas', 'Amanda', 'pylipas.amanda@gmail.com', '06109998766', NULL, NULL, '2000-01-01'),
(10, '1.1.00.10', '$2b$10$yzVdBRtahyJttbx4vPOBH.rqZdfd/vQYKWk.C2QsLDNWGNG4KEuI2', 'student', 'Deeann', 'Nikhil', 'deeann.nikhil@gmail.com', '06109998767', NULL, NULL, '2000-01-01'),
(11, '1.1.00.11', '$2b$10$i.OSvCdpBmL0pxDVXdzc1OrXFIozSIuiQck8//izOjqXroBf9dAZW', 'student', 'Rahul', 'Hugo', 'rahul.hugo@gmail.com', '06109998768', NULL, NULL, '2000-01-01'),
(12, '1.1.00.12', '$2b$10$cwEjdDFPYxSQ12Z9tYqp6e7dBNXGkeAZ9iCxM04EJ5so1Q22bP2Xe', 'student', 'Augustyn', 'Amrita', 'augustyn.amrita@gmail.com', '06109998769', NULL, NULL, '2000-01-01'),
(13, '1.2.00.13', '$2b$10$SNXycKtz2UGx9tpNAlIQnu6xZLnxfD/sZ/KUJqcZ3rTDg.yc6YXEK', 'teacher', 'Bruce', 'Willis', 'brucew@gmail.com', '60702222222', NULL, NULL, '2000-01-01'),
(14, '1.2.00.14', '$2b$10$871AWlAPZa4YEkG2Jr5HHOt.LCAyirJeov3So0z8JwAC/ebFNq3bi', 'teacher', 'Jennifer', 'Aniston', 'ja@gmail.com', '60702222223', NULL, NULL, '2000-01-01'),
(15, '5.1.00.15', '$2b$10$7hFh6SjSkAMNqnKJ6Qu6XetG3xfjE9HywdD4t92Ap.N2XfDUCHxhO', 'student', 'Jack', 'Daniels', 'jd@gmail.com', '06702007000', NULL, NULL, '2000-10-10'),
(16, '203058/003', '$2b$10$qp8m0I7DVqzxEtq.kuLap.b2My64.e86.BuPNJIA3.fC47fp5yYb6', 'schooladmin', '', '', NULL, NULL, NULL, NULL, NULL),
(17, '16.2.70.17', '$2b$10$.giuU/uODDhL9QdIHQIpUeMxetlvswEsH2CHQ74LJl8Ths2ws0AtO', 'teacher', 'Evans', 'Ophelia', 'opheliaevans@gmail.com', '06201587546', NULL, 3, '1970-05-14'),
(18, '16.1.04.18', '$2b$10$xg12ADDazFIF.jvWBOnKwuHIG9ICd8G7Xm7y.3Trdw7yG4i8IuL1W', 'student', 'Elias', 'Cherry', 'eliascherry@gmail.com', '06308971624', NULL, 3, '2004-05-23'),
(19, '16.2.70.19', '$2b$10$P8bTHf/owr3rCofJRonvwOEG7m7wshX9XHWSx8pklVjhSpTPM7n3e', 'teacher', 'Emily', 'Allison', 'Emilyallison@gmail.com', '06703654725', NULL, 4, '1970-03-28'),
(20, '16.1.05.20', '$2b$10$.jSues/NaXULcAvFBSQsMeu.W1N.HoIBbcElV6NJLH.GSpX90WF7a', 'student', 'Otto', 'Hood', 'ottohood@gmail.com', '06203541697', NULL, 3, '2005-02-18'),
(21, '16.1.04.21', '$2b$10$4ypDnKv0ES1opT.UmNsa2Oewc0Y1LCLdvfabciYKL1C2qv.qoAYnu', 'student', 'Tessa', 'Ahmed', 'tessaahmed@gmail.com', '06203541568', NULL, 3, '2004-08-10'),
(22, '16.1.04.22', '$2b$10$draOAmL2lddlh4gf6pxIOOHpRpy.xnZtOyPDM7/ZlXDtDCQE4bcQ6', 'student', 'Lucia', 'Proctor', 'luciaproctor@gmail.com', '06702312014', NULL, 3, '2004-05-25'),
(23, '16.1.04.23', '$2b$10$Ma83zkmSzhfEWUPX2.21teauBQgM0UxbIFy8bQ0SziWwnleYs.tmK', 'student', 'Avery', 'Vo', 'averyvo@gmail.com', '06502364578', NULL, 3, '2004-05-31'),
(24, '16.1.04.24', '$2b$10$plUbk04TJiWXgXU.7UTmVup/YMa9GBJJspFfjvAximUzbjB47trzy', 'student', 'Vera', 'Rosas', 'verarosas@gmail.com', '06302047182', NULL, 3, '2004-02-05'),
(25, '16.1.04.25', '$2b$10$Y.lvK3tF85OkJA8IX2WsVehg3byunInpYZm90gC8gDZErYNhsljqe', 'student', 'Koa', 'Pittman', 'koapittman@gmail.com', '06309064512', NULL, 3, '2004-05-02'),
(26, '16.1.04.26', '$2b$10$FG3lUDsS0XIbOd1BVGmBeeFf51lri7Ymku2cLDGD7683CpFYOLL.G', 'student', 'Dariel', 'Burke', 'darielburke@gmail.com', '06305014596', NULL, 3, '2004-10-13'),
(27, '16.1.04.27', '$2b$10$BEC8eYjUgqg7vI90c.SBlueKZY7Yi5PfiI50JPmC3QAPlKlJagzJi', 'student', 'Izabella', 'Haley', 'izabellahaley@gmail.com', '06305014595', NULL, 3, '2004-12-16'),
(28, '16.1.04.28', '$2b$10$POujKILcCW8TTazGwWl5f.HHvrFkGaNuKQIgfrOk4/EjCz3An3Z6K', 'student', 'Jacob', 'Hubbard', 'jacobhubbard@gmail.com', '06205236958', NULL, 3, '2004-05-19'),
(29, '16.1.05.29', '$2b$10$4g2mapAyAKX8.W6YRfQRnOJVbIz9iNjz0atOIL0Bb4yRAIjHu4Rvi', 'student', 'Ariyah', 'Sanchez', 'ariyahsanchez@gmail.com', '06209876543', NULL, 3, '2005-02-15'),
(30, '16.1.05.30', '$2b$10$PFHY39lA0x68GZERG.5KXu3xxmbIZE.gHq.1cz1Ux7qDPBrrGDHMS', 'student', 'Solomon', 'Olson', 'solomonolson@gmail.com', '06201045263', NULL, 3, '2005-02-25'),
(31, '16.1.04.31', '$2b$10$ejMvMhTDVfVBS2XqdcrVfune49CKvY6d9o3wmpzfD5Hvw3xvyOrxi', 'student', 'Duke', 'Patton', 'dukepatton@gmail.com', '06300814563', NULL, 3, '2004-06-05'),
(32, '16.1.04.32', '$2b$10$uBuppHQ03pVXXXwEeap2gOpyoI8emF2I5bhQErkLMDA4in.zZbz/.', 'student', 'Isabel', 'Price', 'isabelprice@gmail.com', '06300858563', NULL, 3, '2004-06-23'),
(33, '16.1.04.33', '$2b$10$FqdxdsCqchQ9pXQDyK57tePgv0dWyW3YXt73qHuhEi7qkJ35QCB0a', 'student', 'Abram', 'Cameron', 'AbramCameron@gmail.com', '06304563218', NULL, 3, '2004-06-10'),
(34, '16.1.04.34', '$2b$10$w1iFAwN661CFhu4in9m0POJv5fOkY/u4QDyls1rYm2Pyi.PzUbpc2', 'student', 'Keyla', 'Glenn', 'keylaglenn@gmail.com', '06304563274', NULL, 4, '2004-08-25'),
(35, '16.1.04.35', '$2b$10$Q4KN22SI5mIOwlXwYs1.L.BnzwhWTty4xOoIasyh7SKoToTv7IYpy', 'student', 'Zaid', 'Bean', 'zaidbean@gmail.com', '06304233274', NULL, 4, '2004-08-12'),
(36, '16.1.04.36', '$2b$10$XDN7keVRJLrzyWGwrtSHp.IVF662UgRzKzXS1KoFLDZmob6Px5SZa', 'student', 'Jenesis', 'French', 'jenesisfrench@gmail.com', '06304256274', NULL, 4, '2004-08-31'),
(37, '16.1.04.37', '$2b$10$sc89bEdG/jcL7Yh5PcJd7OvjekYrOa6nj4mzKg2edCSp6kHkvM0fW', 'student', 'Etta', 'York', 'ettayork@gmail.com', '06205896494', NULL, 4, '2004-09-15'),
(38, '16.1.04.38', '$2b$10$XJB.5XnssNETGNrP2oId0OB5qbcolAybexAUEC4Qgoiy3dZtC5rdO', 'student', 'Leandro', 'Moyer', 'leandromoyer@gmail.com', '06205896434', NULL, 4, '2004-09-10'),
(39, '16.1.04.39', '$2b$10$57Bqz5lpmuPJVPXK1dt8oeB.LT0c4P.1h.RQ3jxPvqFMZaw8RFf9O', 'student', 'Remi', 'Orozci', 'remiorozci@gmail.com', '06205256434', NULL, 4, '2004-09-24'),
(40, '16.1.04.40', '$2b$10$.jILcF7rQ6bwGSehBOfkF..jISKOOi3fTQ5LYke3J9KRUG0ZA6Zfq', 'student', 'Keanu', 'Morrow', 'keanumorrow@gmail.com', '06206856434', NULL, 4, '2004-09-20'),
(41, '16.1.04.41', '$2b$10$8IDutji5hob/c0BWwO79zOb9zQ5WuqHzYPjiSSrF0vGOr3gUy6/Ey', 'student', 'Reyna', 'Merendez', 'reynamerendez@gmail.com', '06206856458', NULL, 4, '2004-06-16'),
(42, '16.1.04.42', '$2b$10$DNNItNnDxie4tkBWvY8BGu.kGu237SMq6Mi9MXjmUJkgTP8u7AvMO', 'student', 'Caleb', 'Briggs', 'calebbriggs@gmail.com', '06206852758', NULL, 4, '2004-06-13'),
(43, '16.1.04.43', '$2b$10$IAxKYOkuoho.vuB.lrfztOMO3R6Vs9ulX9tOULw9uB828vx2658tW', 'student', 'Alia', 'McCan', 'aliamccan@gmail.com', '06301547956', NULL, 4, '2004-08-25'),
(44, '16.1.04.44', '$2b$10$bfCMltEQwP0m.HRNW6js/epPOD46AZ7Jk4Z3R8V5IFv0TbfJzbnmi', 'student', 'Alfred', 'Duran', 'alfredduran@gmail.com', '06301547932', NULL, 4, '2004-03-27'),
(45, '16.1.04.45', '$2b$10$qKNGUiiMfvUHsIoahLqsAOx2zWaCrFgY5e/q/uHO0cxBvvUsCoHmW', 'student', 'Ivory', 'Cook', 'IvoryCook@gmail.com', '06301545432', NULL, 4, '2004-03-10'),
(46, '16.1.04.46', '$2b$10$PCk4m864tfkwrthbkx6D1.YHxMy1Nn5DK21zzAVCJALdck5gCzgTi', 'student', 'Ezekiel', 'Clark', 'ezekielclark@gmail.com', '06301125432', NULL, 4, '2004-03-26'),
(47, '16.1.04.47', '$2b$10$nAkNzhlje72Skh0N/BoBuuPkDVhv/Li8wpqec.x4t6.RQNg8.m3kK', 'student', 'Jazmin', 'Mendez', 'jazminmendez@gmail.com', '06301565432', NULL, 4, '2004-04-22'),
(48, '16.1.04.48', '$2b$10$fya3A48HQfvNJuzy47XBc.eTQHEQt4L./znVznAkM3tA1cvdElwM2', 'student', 'Jones', 'Wall', 'joneswall@gmail.com', '06301565456', NULL, 4, '2004-04-13'),
(49, ' 203058/002', '$2b$10$iYFq4Xm2cLk0pKlfquMCSuGhOmPyt2PQ5q7xiawoop3quWHxhLIs2', 'schooladmin', '', '', NULL, NULL, NULL, NULL, NULL),
(50, '49.2.70.50', '$2b$10$n7wwfGcQLgIRIHLguQxeQuXC11NWusT.Z74MoLYaZKMPKhle7VzyC', 'teacher', 'Tory', 'Pittman', 'toripittman@gmail.com', '06708046234', NULL, 5, '1970-12-06'),
(51, '49.2.70.51', '$2b$10$tpF.kJYzLRikrPIRMy920u8GEVUp2zfPOWQI5zk.90tjj1VehyqBC', 'teacher', 'Nelson', 'Blair', 'nelsonblair@gmail.com', '06708059234', NULL, 6, '1970-12-23'),
(52, '49.1.03.52', '$2b$10$FVOvCaJ38XgiYev7bt7og.3mBygymq.UZYPRztJMF4pTXdEf/9ucK', 'student', 'Harmony', 'Fowler', 'harmonyfowler@gmail.com', '06202548975', NULL, 5, '2003-05-14'),
(53, '49.1.03.53', '$2b$10$6BTxVt772uNjkEzfNEMZfOZ0tHuvR.Q0aachaD3XTzUyoETvQo8.i', 'student', 'Kameron', 'Moore', 'kameronmoore@gmail.com', '06202542375', NULL, 5, '2003-05-16'),
(54, '49.1.03.54', '$2b$10$Du3dvTllpCuemqkOz0CGhuaTSwzZD3/qj4aCj2L7w/42b4QztKVI.', 'student', 'Emily', 'Esparza', 'emilyesparza@gmail.com', '06202542342', NULL, 5, '2003-05-22'),
(55, '49.1.03.55', '$2b$10$FNV2MzXe0ly44dmL2ZIVf.cil8JPZsXLSEm.28mCXNabgtPprZgMq', 'student', 'Carl', 'Morse', 'emilyesparza@gmail.com', '06202556342', NULL, 5, '2003-05-10'),
(56, '49.1.03.56', '$2b$10$0VSryBBfreWE1BW.ST0DwO.tWVs4357ev9IJW3NtBQN6hwhGS9SYi', 'student', 'Carter ', 'Livingston', 'carterlivingston@gmail.com', '06203016497', NULL, 5, '2003-05-06'),
(57, '49.1.03.57', '$2b$10$0Yn5HatwqbFJskbcgCPtOOQHfgjzAFNQ01QcdXdpxANKD8bxpwUC6', 'student', 'Ambrose', 'Weiss', 'ambroseweiss@gmail.com', '06203016452', NULL, 5, '2003-05-17'),
(58, '49.1.03.58', '$2b$10$aa/1tcPcb7boPyM1J.iXL.l8N3/5vAgT7Qd7J1bCcBpZH97a18R5G', 'student', 'Lennox', 'Wang', 'lennoxwang@gmail.com', '06203016441', NULL, 5, '2003-05-28'),
(59, '49.1.03.59', '$2b$10$C74K9kFNCE30Q5wdVGIkD.XVZTIhNa5SNBzPRIQ7wC7OiNmoIdtgy', 'student', 'Cohen', 'Kelley', 'cohenkelley@gmail.com', '06203456441', NULL, 5, '2003-05-06'),
(60, '49.1.04.60', '$2b$10$zgSC1isGQcxsZDCIwCv02u/QgPFPmhgIMUTokMuh.TsFZmQQXcceC', 'student', 'Denisse', 'Roman', 'denisseroman@gmail.com', '06302514869', NULL, 5, '2004-06-24'),
(61, '49.1.04.61', '$2b$10$0uae9W4NCymnJ4M0BxiMI.2U4uEgMVYogVA2mecE2IgheTys0Ahde', 'student', 'Kian', 'Mosley', 'kianmosley@gmail.com', '06302515369', NULL, 5, '2004-06-17'),
(62, '49.1.04.62', '$2b$10$tdpXaCnFRmJU4AWaNAoFyeNsAv6Pl/8DPEk5UfgoTnRcskUybWx2W', 'student', 'Londyn', 'Bauer', 'londynbauer@gmail.com', '06205874512', NULL, 5, '2004-10-28'),
(63, '49.1.04.63', '$2b$10$VvGcbwDIS8kfKIIcl4LEguQJacS6JRmufNhHZU0PdXyAdc.Y/IOAy', 'student', 'Siena', 'Boyle', 'sinaboyle@gmail.com', '06205874558', NULL, 5, '2004-10-15'),
(64, '49.1.04.64', '$2b$10$j5pA18mjCblK7Hz28Jd4neHKsPTnQeDldEeNgH/1Svgc/uPIypiwK', 'student', 'Robin', 'Kaur', 'robinkaur@gmail.com', '06205274558', NULL, 5, '2004-10-23'),
(65, '49.1.04.65', '$2b$10$pbTriiOMWQKcZ4WrCnumiOPqjSpQbmrGhTVZlMk.tFG0ZeZiz7J6y', 'student', 'Wells', 'Martinez', 'wellsmartinez@gmail.com', '06203584859', NULL, 5, '2004-12-06'),
(66, '49.1.04.66', '$2b$10$QE1y7pbhTK6RiD2/IKo/i.Hoh5HE8Q/1kCtCmpgn/GwmKXmHi5XmG', 'student', 'Harper', 'Day', 'harperday@gmail.com', '06203584852', NULL, 5, '2004-12-30'),
(67, '49.1.04.67', '$2b$10$R8ut6l6eLHaN5dGCAG.PGeLKeTuS3kaxGugjeZU95NtS8P/fs2Kbi', 'student', 'Aya', 'Salinas', 'ayasalinas@gmail.com', '06705041023', NULL, 6, '2004-06-25'),
(68, '49.1.04.68', '$2b$10$arNCKumAEk4yae1zRbYnq.7YwlTyz0yZE8nxNeuQf2.gK5M/3.f2a', 'student', 'Robin ', 'Kaur', 'robinkaur@gmail.com', '06203330714', NULL, 6, '2004-08-10'),
(69, '49.1.04.69', '$2b$10$5Vu1oc/tCUymn1qhezx4ZuX/9chwUPhzhYAqnIPuviNRnALMdPgIu', 'student', 'Holland', 'Lang', 'hollandlang@gmail.com', '06203330785', NULL, 6, '2004-08-11'),
(70, '49.1.04.70', '$2b$10$f.N8X46Zu1XsDUdGb3fCweQdIWGE0pGfRR37iKO2L9amT9MbcCFKm', 'student', 'Aziel', 'Paul', 'azielpaul@gmail.com', '06203330741', NULL, 6, '2004-08-12'),
(71, '49.1.04.71', '$2b$10$.P1lkApde/1y6w9tCwYEV.Pm1f9mFkCc4HTG7fGdNrT3EsqZQ21qW', 'student', 'Simon', 'Booker', 'simonbooker@gmail.com', '06203330756', NULL, 6, '2004-08-13'),
(72, '49.1.04.72', '$2b$10$/n7fTLci6yQkWX.miM6pHuHY6ThbD84eMeiU457m6uPKgo9tCVuzS', 'student', 'Naya', 'Steele', 'nayasteele@gmail.com', '06205630756', NULL, 6, '2004-08-14'),
(73, '49.1.04.73', '$2b$10$RZFL0OdazjUTurG/cRfAjupU4BxDnsvYVNvi.Q5x16JGY6UzDn2z.', 'student', 'Jax', 'Mathis', 'jaxmathis@gmail.com', '06205630778', NULL, 6, '2004-08-15'),
(74, '49.1.04.74', '$2b$10$FsFi9jPqMObRic1JQ3Oi/ucpoj71qMZK4QcaIOGk8dJC.Ff5pnEjW', 'student', 'Zoe', 'Shermann', 'zoeshermann@gmail.com', '06203654815', NULL, 6, '2004-08-10'),
(75, '49.1.04.75', '$2b$10$b1jywPVQ21QVCOXNBXT59u8DbNeO5S9WRvGDuMTiyw3rJteB9cxUi', 'student', 'Nova', 'Warren', 'novawarren@gmail.com', '06203654898', NULL, 6, '2004-08-31'),
(76, '49.1.04.76', '$2b$10$/.zri4kokXFh8e38BM5VgelJdMpB4fmwoIIL9sZIteeDRR0vIooSW', 'student', 'Avi', 'Marks', 'avimarks@gmail.com', '06203654854', NULL, 6, '2004-03-01'),
(77, '49.1.04.77', '$2b$10$bgyfKOVQR0HaxcWkKJIhA.H0ircHSxnwuH9NSpEMWP8HgLL1uMjqa', 'student', 'Monica', 'Greer', 'monicagreer@gmail.com', '06203654414', NULL, 6, '2004-03-02'),
(78, '49.1.04.78', '$2b$10$dPP401YDF4sixiPE8CR/6.b/mLNiJkYjQy2Vhohch8M.inTDqp.SO', 'student', 'Rory', 'Knox', 'roryknox@gmail.com', '06203654452', NULL, 6, '2004-03-03'),
(79, '49.1.04.79', '$2b$10$M2a8OlOE9bmeIGJk633XZuDDm3pMNzo7d87b5z14SWmA57GUaiq9K', 'student', 'Anya', 'Stout', 'anyastout@gmail.com', '06203656652', NULL, 6, '2004-03-04'),
(80, '49.1.04.80', '$2b$10$BLfVoHj0lEK2rxTUSoLzj.ZU0tdxYWFkMrSIZ9cmymmueDq4VXQfa', 'student', 'Wren', 'Levy', 'wrenlevy@gmail.com', '06507148529', NULL, 6, '2004-05-01'),
(81, '49.1.04.81', '$2b$10$bVuN.xoc6NCWUdjqCtN0Cuip0meM27duPtD/rCFuRO.kn7ua/H3Im', 'student', 'Brian', 'Wright', 'brianwright@gmail.com', '06507148849', NULL, 6, '2004-05-02');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`AttendanceID`),
  ADD KEY `ScheduleID` (`ScheduleID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- A tábla indexei `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`ClassID`),
  ADD KEY `SchoolID` (`SchoolID`),
  ADD KEY `HeadTeacherID` (`HeadTeacherID`);

--
-- A tábla indexei `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`DocumentID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`GradeID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `TeacherID` (`TeacherID`);

--
-- A tábla indexei `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`NotificationID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `omission`
--
ALTER TABLE `omission`
  ADD PRIMARY KEY (`OmissionID`);

--
-- A tábla indexei `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`ScheduleID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- A tábla indexei `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`SchoolID`),
  ADD UNIQUE KEY `SchoolName` (`SchoolName`),
  ADD UNIQUE KEY `SchoolIdentifier` (`SchoolIdentifier`);

--
-- A tábla indexei `subjectassignments`
--
ALTER TABLE `subjectassignments`
  ADD PRIMARY KEY (`AssignmentID`),
  ADD KEY `TeacherID` (`TeacherID`);

--
-- A tábla indexei `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`CourseID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD KEY `OmissionFK` (`OmissionFK`),
  ADD KEY `ClassID` (`ClassID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `attendance`
--
ALTER TABLE `attendance`
  MODIFY `AttendanceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `classes`
--
ALTER TABLE `classes`
  MODIFY `ClassID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `documents`
--
ALTER TABLE `documents`
  MODIFY `DocumentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `grades`
--
ALTER TABLE `grades`
  MODIFY `GradeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `omission`
--
ALTER TABLE `omission`
  MODIFY `OmissionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `schedule`
--
ALTER TABLE `schedule`
  MODIFY `ScheduleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `schools`
--
ALTER TABLE `schools`
  MODIFY `SchoolID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `subjectassignments`
--
ALTER TABLE `subjectassignments`
  MODIFY `AssignmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `subjects`
--
ALTER TABLE `subjects`
  MODIFY `CourseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`ScheduleID`) REFERENCES `schedule` (`ScheduleID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`StudentID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`SchoolID`) REFERENCES `schools` (`SchoolID`),
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`HeadTeacherID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `subjects` (`CourseID`),
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`TeacherID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `subjects` (`CourseID`),
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`ClassID`) REFERENCES `classes` (`ClassID`),
  ADD CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`ClassID`) REFERENCES `classes` (`ClassID`);

--
-- Megkötések a táblához `subjectassignments`
--
ALTER TABLE `subjectassignments`
  ADD CONSTRAINT `subjectassignments_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `users` (`UserID`);

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`OmissionFK`) REFERENCES `omission` (`OmissionID`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`ClassID`) REFERENCES `classes` (`ClassID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
