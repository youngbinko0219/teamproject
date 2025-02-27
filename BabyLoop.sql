-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.6.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- babyloop 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `babyloop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `babyloop`;

-- 테이블 babyloop.cart 구조 내보내기
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `rental_start` date NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user` (`user_id`),
  KEY `fk_cart_product` (`product_id`),
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.cart:~0 rows (대략적) 내보내기

-- 테이블 babyloop.grades 구조 내보내기
CREATE TABLE IF NOT EXISTS `grades` (
  `grade_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `grade_name` varchar(100) DEFAULT 'Basic',
  `point_rate` float DEFAULT 0.01,
  `required_points` int(11) DEFAULT 100000,
  PRIMARY KEY (`grade_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_grades_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.grades:~0 rows (대략적) 내보내기
INSERT INTO `grades` (`grade_id`, `user_id`, `grade_name`, `point_rate`, `required_points`) VALUES
	(1, 'aaaa1234', 'Basic', 0.01, 100000),
	(2, 'Google_ba87399de3', 'Basic', 0.01, 100000),
	(3, 'Naver_e8e6064ab4', 'Basic', 0.01, 100000);

-- 테이블 babyloop.images 구조 내보내기
CREATE TABLE IF NOT EXISTS `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `review_id` int(11) DEFAULT NULL,
  `images` varchar(1000) DEFAULT NULL,
  `flag` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT sysdate(),
  PRIMARY KEY (`image_id`),
  KEY `fk_images_product` (`product_id`),
  CONSTRAINT `fk_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.images:~201 rows (대략적) 내보내기
INSERT INTO `images` (`image_id`, `product_id`, `review_id`, `images`, `flag`, `created_at`) VALUES
	(1, 1, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2948ec5861aa49b19afc18b3850885ef_m001.jpg', 'main', '2025-02-27'),
	(2, 1, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7193e23858e3488792b4814833c10362_s001-1.jpg', 'sub', '2025-02-27'),
	(3, 1, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e2eb1bfceb4d428a998f5937c7648147_s001-2.jpg', 'sub', '2025-02-27'),
	(4, 1, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c91d2a9b9555448ea53e879f998de41b_s001-3.jpg', 'sub', '2025-02-27'),
	(5, 1, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9daef4c32ddf4880b984d37abcdce0a7_d001.jpg', 'desc', '2025-02-27'),
	(6, 2, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2ab735310e2c48bab91525fcaf756a2d_m002.jpg', 'main', '2025-02-27'),
	(7, 2, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5292c2957f0447519d0f38b23d9ba450_s002-1.jpg', 'sub', '2025-02-27'),
	(8, 2, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/983e3b01a77042d7b26250d794d98223_s002-2.jpg', 'sub', '2025-02-27'),
	(9, 2, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a2af20da91d54e6db3fb53477bcb2a6a_s002-3.jpg', 'sub', '2025-02-27'),
	(10, 2, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/6922c1f394f048839a19b24dfe1a7e7a_d002.jpg', 'desc', '2025-02-27'),
	(11, 3, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/38a21d8f783c46d28048bdc05316069e_m003.jpg', 'main', '2025-02-27'),
	(12, 3, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f2bebd9e76764bdcae2d9d3bbce8c552_s003-1.jpg', 'sub', '2025-02-27'),
	(13, 3, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f33579f1d8be4f21b0a4f4cdcc6c7630_s003-2.jpg', 'sub', '2025-02-27'),
	(14, 3, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/bcb3460a5f0645409dc403d5f7cc6045_s003-3.jpg', 'sub', '2025-02-27'),
	(15, 3, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f14aa3bb9af04e1db146ed51ccfaf1ac_d003.jpg', 'desc', '2025-02-27'),
	(16, 4, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fb8a36eeff644d8c96f5844a317b3bd5_m004.jpg', 'main', '2025-02-27'),
	(17, 4, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d66fc37597b645f6a396bd16889c6335_s004-1.jpg', 'sub', '2025-02-27'),
	(18, 4, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/50e0b0d0e3104ebf8f1f30d870bc0b4b_s004-2.jpg', 'sub', '2025-02-27'),
	(19, 4, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/ddb0c5107c834edeaa60954003224577_s004-3.jpg', 'sub', '2025-02-27'),
	(20, 4, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/649271dfcd5744b39d636b31ce1cf235_d004.jpg', 'desc', '2025-02-27'),
	(21, 5, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/95172fcd38ce4fd092bb7e778f68c4ba_m005.jpg', 'main', '2025-02-27'),
	(22, 5, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/4512089b8d2a446e9d11d9683e7b8f8c_s005-1.jpg', 'sub', '2025-02-27'),
	(23, 5, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a9e8174eee004a16af76d20bb66e7cf8_s005-2.jpg', 'sub', '2025-02-27'),
	(24, 5, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d16ec863e08f4de3aa97aeba602d7b3d_s005-3.jpg', 'sub', '2025-02-27'),
	(25, 5, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/041d6ae377aa43a3a726ccf322c4f02d_d005.jpg', 'desc', '2025-02-27'),
	(26, 6, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/3e5052230f16497c9cd5938c8610c36b_m006.jpg', 'main', '2025-02-27'),
	(27, 6, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7f459a08c6004f17b9b0949e7c71bc05_s006-1.jpg', 'sub', '2025-02-27'),
	(28, 6, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/449ce5490bc54074a0b196265cf3fa6a_s006-2.jpg', 'sub', '2025-02-27'),
	(29, 6, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/673ac0ad668543e68e27f7c818f597a6_s006-3.jpg', 'sub', '2025-02-27'),
	(30, 6, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/413bf00b03f94070acb1652254eb8117_d006.jpg', 'desc', '2025-02-27'),
	(31, 7, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/715570feee9d4d5abc306da89a7f5f1e_m007.jpg', 'main', '2025-02-27'),
	(32, 7, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/972668b49a8e47b080c2cb26aa3c91dd_s007-1.jpg', 'sub', '2025-02-27'),
	(33, 7, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/af4d7523c72b4c60aff51dbc5b6c41c3_s007-2.jpg', 'sub', '2025-02-27'),
	(34, 7, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/71a3c62f60084714b4c24c617f3732dc_s007-3.jpg', 'sub', '2025-02-27'),
	(35, 7, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f4780445ebb842f1868145d72a5513e5_d007.jpg', 'desc', '2025-02-27'),
	(36, 8, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c6482241c1d54688966131314752538b_m008.jpg', 'main', '2025-02-27'),
	(37, 8, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/be4c4090ace64e0a9fda54b0e3498c0c_s008-1.jpg', 'sub', '2025-02-27'),
	(38, 8, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a40bf66e990d44139e18e0cb73267064_s008-2.jpg', 'sub', '2025-02-27'),
	(39, 8, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/feeec9baa79c4399b30dbb6849b4f5e1_s008-3.jpg', 'sub', '2025-02-27'),
	(40, 8, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/cb1779e21d0d42c7b3a4814b8dbaa622_d008.jpg', 'desc', '2025-02-27'),
	(41, 9, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/cb55434594864d55bf6911674a55acb5_m009.jpg', 'main', '2025-02-27'),
	(42, 9, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/68ae1013fda64d789477cd795b12c4bb_s009-1.jpg', 'sub', '2025-02-27'),
	(43, 9, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0e1ad2b31def434a96c7c6b0b9a612c9_s009-2.jpg', 'sub', '2025-02-27'),
	(44, 9, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d1e0dedddbde416a984b0e728586de85_s009-3.jpg', 'sub', '2025-02-27'),
	(45, 9, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5bd888d5f62a43389342863e1c591759_d009.jpg', 'desc', '2025-02-27'),
	(46, 10, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/91dcebc78116415aa3b3a4b81f67dfa3_m010.jpg', 'main', '2025-02-27'),
	(47, 10, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a93ac79945bf4bb5a7e5ee0dc25702b6_s010-1.jpg', 'sub', '2025-02-27'),
	(48, 10, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7396bc71a4734e41b0e7033469ef7889_s010-2.jpg', 'sub', '2025-02-27'),
	(49, 10, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/cfa03b17d45b4dce9c88f4716bd0fdc9_s010-3.jpg', 'sub', '2025-02-27'),
	(50, 10, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9dbddad787514bd980cc05f618b795dd_d010.jpg', 'desc', '2025-02-27'),
	(51, 11, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d4a35e22605c480da4c59a0ed262c036_m011.jpg', 'main', '2025-02-27'),
	(52, 11, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/41aa95c9436a46b1a7fe7f006de00a6a_s011-1.jpg', 'sub', '2025-02-27'),
	(53, 11, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/209773baccf24cbfb10942cb70333408_s011-2.jpg', 'sub', '2025-02-27'),
	(54, 11, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/94e07cae6b1b4e3b9a7e10ef14723074_s011-3.jpg', 'sub', '2025-02-27'),
	(55, 11, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/3b456fa4a5bc4e70aa5979043dd71fe7_d011.jpg', 'desc', '2025-02-27'),
	(56, 12, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/19a7fd7e2a49451b861bc8683b97870c_m012.jpg', 'main', '2025-02-27'),
	(57, 12, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/ae1ba673ff9e4724a68136d1f8004569_s012-1.jpg', 'sub', '2025-02-27'),
	(58, 12, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/55e1b69816314000bce6e4a1f1ad7114_s012-2.jpg', 'sub', '2025-02-27'),
	(59, 12, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/418bd593e3874093a3ac116c71c13a49_s012-3.jpg', 'sub', '2025-02-27'),
	(60, 12, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8e692462f9544366a9dc2a69b28c6024_d012.jpg', 'desc', '2025-02-27'),
	(61, 13, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/55a1388ab035480fbe270f83143c7361_m013.jpg', 'main', '2025-02-27'),
	(62, 13, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/64cea09e41b64a40afdd2b557db779de_s013-1.jpg', 'sub', '2025-02-27'),
	(63, 13, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/4bce2afd728f40da81001ab98c225fac_s013-2.jpg', 'sub', '2025-02-27'),
	(64, 13, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/06f12d86b8434d94bfcf4f689e672499_s013-3.jpg', 'sub', '2025-02-27'),
	(65, 13, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/96ad034ff6e6460e9b129c7f257c28b7_d013.jpg', 'desc', '2025-02-27'),
	(66, 14, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/044f0a19617c458285a562ea9101c1c2_m014.jpg', 'main', '2025-02-27'),
	(67, 14, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/65e38f2b3eb44c7b84bbbff844c9cb56_s014-1.jpg', 'sub', '2025-02-27'),
	(68, 14, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7b8d52d7dc624b0395f961a165ae1da4_s014-2.jpg', 'sub', '2025-02-27'),
	(69, 14, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8f7468c38655406aa67dd03309ab8b55_s014-3.jpg', 'sub', '2025-02-27'),
	(70, 14, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fda4b068dcd64e6aa985898e29353eb4_d014.jpg', 'desc', '2025-02-27'),
	(71, 15, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/43960fa677304c418b13487636d6d19f_m015.jpg', 'main', '2025-02-27'),
	(72, 15, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/73082ad83eae49f0ad9f29d3798ac617_s015-1.jpg', 'sub', '2025-02-27'),
	(73, 15, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/bd20b6afecfe4cfdba47ba9d22e75ef0_s015-2.jpg', 'sub', '2025-02-27'),
	(74, 15, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/43b46da8638e42f49fb48c9c65514b68_s015-3.jpg', 'sub', '2025-02-27'),
	(75, 15, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/446a0fe8183940ee8d698849a423bbbc_d015.jpg', 'desc', '2025-02-27'),
	(76, 16, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0e549b75b8134759a7c36debdfbaa76a_m016.jpg', 'main', '2025-02-27'),
	(77, 16, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5e3b6eeff7fa4e7ea74154a7940d3fb3_s016-1.jpg', 'sub', '2025-02-27'),
	(78, 16, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/60e7c37ba13344249afe60ab9e7fa75c_s016-2.jpg', 'sub', '2025-02-27'),
	(79, 16, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0c3a4db6d1d443d183b4efda41a65d21_s016-3.jpg', 'sub', '2025-02-27'),
	(80, 16, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/30fbcd1ca77d45ccbe82dffeeb2c60f4_d016.jpg', 'desc', '2025-02-27'),
	(81, 17, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e3914fe92d8d4783b7daf245f26611b8_m002.jpg', 'main', '2025-02-27'),
	(82, 17, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d8982daabb3145efae08f807fda9b675_s002-1.jpg', 'sub', '2025-02-27'),
	(83, 17, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d97d86ab4f8b451d89e8b61a2ae00f56_s002-2.jpg', 'sub', '2025-02-27'),
	(84, 17, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2a3c477374af4bb69d3c5a551c5b0476_s002-3.jpg', 'sub', '2025-02-27'),
	(85, 17, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/98ebec38285245f889764e83de0ca3b4_d002.jpg', 'desc', '2025-02-27'),
	(86, 18, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/217f310ac1734886b30dcdcaa246240b_m004.jpg', 'main', '2025-02-27'),
	(87, 18, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/be2ba3b2eebc4dd3a15fac557fcad276_s004-1.jpg', 'sub', '2025-02-27'),
	(88, 18, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e80acdde6b96426281ce9584f50877fb_s004-2.jpg', 'sub', '2025-02-27'),
	(89, 18, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/166b83dd3f404bc6b7075b36097785c4_s004-3.jpg', 'sub', '2025-02-27'),
	(90, 18, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7cba15bb6433461283a2ab8671bb192a_d004.jpg', 'desc', '2025-02-27'),
	(91, 19, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/ee275c2cce7c40a89ec0465990e24788_m011.jpg', 'main', '2025-02-27'),
	(92, 19, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/34aa63ad424b4ac9ab2b9e0c89491b6c_s011-1.jpg', 'sub', '2025-02-27'),
	(93, 19, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/6d6d6e2f1a544b9093762330acac863b_s011-2.jpg', 'sub', '2025-02-27'),
	(94, 19, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fef64691e3e34e43a432706ad76daf68_s011-3.jpg', 'sub', '2025-02-27'),
	(95, 19, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5f27b2b3c02c40b98d628b8815d45a06_d011.jpg', 'desc', '2025-02-27'),
	(96, 20, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/103b4a4a144047c59f5d84b7fefebe79_m001.jpg', 'main', '2025-02-27'),
	(97, 20, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7f5b4653c8c443888964a81b1bee155d_s001-1.jpg', 'sub', '2025-02-27'),
	(98, 20, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/44b03edbf79449a89170b0a74c1cc2c0_s001-2.jpg', 'sub', '2025-02-27'),
	(99, 20, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a56637dedba6407986ad2798e665fbc6_s001-3.jpg', 'sub', '2025-02-27'),
	(100, 20, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/76ae84008eb54a72904cf0269e4f2527_d001.jpg', 'desc', '2025-02-27'),
	(101, 21, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/78f8448bfe1048278725a19d3857f8d6_m002.jpg', 'main', '2025-02-27'),
	(102, 21, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/94be671eaacf4583a59bdacf98f9c4be_s002-1.jpg', 'sub', '2025-02-27'),
	(103, 21, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/093cd16731514742b5cddabc57090570_s002-2.jpg', 'sub', '2025-02-27'),
	(104, 21, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/dc1ba9ff12f44ecebf549be1ab1163bf_s002-3.jpg', 'sub', '2025-02-27'),
	(105, 21, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f0b3d7f12e29473a9f84342238d645a8_d002.jpg', 'desc', '2025-02-27'),
	(106, 22, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f55c0bf78e8c44a2b27b07ba451a4bc2_m003.jpg', 'main', '2025-02-27'),
	(107, 22, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/08d64612700948839af17e8e75efc2c0_s003-1.jpg', 'sub', '2025-02-27'),
	(108, 22, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/252538fc31c4491eb3434f0c312f686c_s003-2.jpg', 'sub', '2025-02-27'),
	(109, 22, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/731ea0e4537d4a37a8b45935e4e5572d_s003-3.jpg', 'sub', '2025-02-27'),
	(110, 22, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/3224d5b763bd4a2995d077e805b18710_d003.jpg', 'desc', '2025-02-27'),
	(111, 23, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/dfcd7fbe7b9f4064b2adf5c7b7f89612_m004.jpg', 'main', '2025-02-27'),
	(112, 23, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/81800e697f5b46978b3e435262eadb4e_s004-1.jpg', 'sub', '2025-02-27'),
	(113, 23, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/04625c00e6cd4ff19b15c1904d0734c5_s004-2.jpg', 'sub', '2025-02-27'),
	(114, 23, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/b54232106bef475680e8b0296b63f384_s004-3.jpg', 'sub', '2025-02-27'),
	(115, 23, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d4631382dbb14c35a5e40026252d5e72_d004.jpg', 'desc', '2025-02-27'),
	(116, 24, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/b339b968be474a34b901fcb22e9ee253_m003.jpg', 'main', '2025-02-27'),
	(117, 24, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/51488483d9d042b59e77e293d3ad90c8_s003-1.jpg', 'sub', '2025-02-27'),
	(118, 24, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/de4d84d839aa4013a8a269da4514188c_s003-2.jpg', 'sub', '2025-02-27'),
	(119, 24, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/248b4a87b5054d6e8a58bf5f2d8ad3d8_s003-3.jpg', 'sub', '2025-02-27'),
	(120, 24, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f0bb2aacb0f04660a502d66ad551fceb_d003.jpg', 'desc', '2025-02-27'),
	(121, 25, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fdffc34d88254c07b555c703f1bc363c_m001.jpg', 'main', '2025-02-27'),
	(122, 25, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/bf81742bdb28439bbcdb798a3bba8a80_s001-1.jpg', 'sub', '2025-02-27'),
	(123, 25, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0498a5d7583941ff9b00a8ee0d2ab55f_s001-2.jpg', 'sub', '2025-02-27'),
	(124, 25, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/b82081b6e89847749de2d1043e108d7c_s001-3.jpg', 'sub', '2025-02-27'),
	(125, 25, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/41364c850bf44c4b9dcca7c076c1179c_d001.jpg', 'desc', '2025-02-27'),
	(126, 26, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/278d1d084cf74de591d701426e33cfa2_m002.jpg', 'main', '2025-02-27'),
	(127, 26, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/05ee1ab2ac8b4442a9bc721496fff40c_s002-1.jpg', 'sub', '2025-02-27'),
	(128, 26, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/20ed60b3e6ab461ea248e98bd7656d56_s002-2.jpg', 'sub', '2025-02-27'),
	(129, 26, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/4fe7d8abfe184b7c8996dfc3b9bb221f_s002-3.jpg', 'sub', '2025-02-27'),
	(130, 26, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/60f3c5d211fa480bb0ad10d77ed97a09_d002.jpg', 'desc', '2025-02-27'),
	(131, 27, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/53787f77335f422baf7ec5681aec7817_m003.jpg', 'main', '2025-02-27'),
	(132, 27, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/3d5b43acf0e94a988d36070f92d03720_s003-1.jpg', 'sub', '2025-02-27'),
	(133, 27, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/450e990636d74a90b166e47a8fb379d0_s003-2.jpg', 'sub', '2025-02-27'),
	(134, 27, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/549859dfdcd6445c86c4ba2dda85f98c_s003-3.jpg', 'sub', '2025-02-27'),
	(135, 27, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/533d231057744befaa8d0284d4d4af9b_d003.jpg', 'desc', '2025-02-27'),
	(136, 28, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/03de25409b1746159bbafbabe39d7a21_m004.jpg', 'main', '2025-02-27'),
	(137, 28, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/489140627e564116ae6bdc49cd3eb4b8_s004-1.jpg', 'sub', '2025-02-27'),
	(138, 28, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/aceb1d235b3d4027be806c38c08cc0b2_s004-2.jpg', 'sub', '2025-02-27'),
	(139, 28, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/90b775a2e7434667be7b52e1df4d1b88_s004-3.jpg', 'sub', '2025-02-27'),
	(140, 28, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/769bfa874b74437f9608e47ca88a8e39_d004.jpg', 'desc', '2025-02-27'),
	(141, 29, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c79cb89c9cd34c3b9a4df1ce84bb236b_m005.jpg', 'main', '2025-02-27'),
	(142, 29, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0d691bc74d7b471e8cc095c360ca7709_s005-1.jpg', 'sub', '2025-02-27'),
	(143, 29, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7cb3b3f1fb1d45d6a648ef9a576dc815_s005-2.jpg', 'sub', '2025-02-27'),
	(144, 29, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9667c9226b7f4491b8104a20ddc90196_s005-3.jpg', 'sub', '2025-02-27'),
	(145, 29, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/696bd5ef843e4c9085a616c4919f0362_d005.jpg', 'desc', '2025-02-27'),
	(146, 30, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/eaf0041d434e4125adf7c073ad733cdb_m006.jpg', 'main', '2025-02-27'),
	(147, 30, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/663363d2e1884358ad8b3e28c223a5bc_s006-1.jpg', 'sub', '2025-02-27'),
	(148, 30, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/aeea479a29414cc8b3d589ff403b6a11_s006-2.jpg', 'sub', '2025-02-27'),
	(149, 30, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2a68d4cc7497459abe1dcb3895fd37b7_s006-3.jpg', 'sub', '2025-02-27'),
	(150, 30, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fca52e2e1c8c433881416a0e65156883_d006.jpg', 'desc', '2025-02-27'),
	(151, 31, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/adc243ab350043f2bb4c1ee89defaa01_m007.jpg', 'main', '2025-02-27'),
	(152, 31, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2cbe409f00c74fc18917db72cd24d8eb_s007-1.jpg', 'sub', '2025-02-27'),
	(153, 31, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/13489c69af9d455db54206be7bf51583_s007-2.jpg', 'sub', '2025-02-27'),
	(154, 31, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e5128f3ae1b14825a34dc0c752644482_s007-3.jpg', 'sub', '2025-02-27'),
	(155, 31, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c57424977d57416faadcf44ab9b99882_d007.jpg', 'desc', '2025-02-27'),
	(156, 32, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f85cbee2bff94b7880fa0194c27eda4b_m008.jpg', 'main', '2025-02-27'),
	(157, 32, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/74d1d1f55c7c4919947d3a9a54ff2534_s008-1.jpg', 'sub', '2025-02-27'),
	(158, 32, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/76a9abd8ab9f4189882482c7ed144905_s008-2.jpg', 'sub', '2025-02-27'),
	(159, 32, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e4cec165304e4c1a9d168519ca6ee3bb_s008-3.jpg', 'sub', '2025-02-27'),
	(160, 32, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/707d0753431d45f5b2ab7fb67f1aef10_d008.jpg', 'desc', '2025-02-27'),
	(161, 33, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/0f63e033986649acb0ee8a8759d01233_m009.jpg', 'main', '2025-02-27'),
	(162, 33, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d556cd6a96f145d29574751d77b3f6c2_s009-1.jpg', 'sub', '2025-02-27'),
	(163, 33, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/bd93931514a1452d812adacfeb28fd30_s009-2.jpg', 'sub', '2025-02-27'),
	(164, 33, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2e632348ea40439ea1968e97e6080a8e_s009-3.jpg', 'sub', '2025-02-27'),
	(165, 33, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/059dbcd0842e4374b455ec236523d3ed_d009.jpg', 'desc', '2025-02-27'),
	(166, 34, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/faebebfa20aa4f74bb5cc5357ffd84f2_m010.jpg', 'main', '2025-02-27'),
	(167, 34, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5a44b6b01bff4f0aa262df5f2800d1a1_s010-1.jpg', 'sub', '2025-02-27'),
	(168, 34, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/bdd45f3081d24eee9b6bf61d3e26f8e6_s010-2.jpg', 'sub', '2025-02-27'),
	(169, 34, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/357716ff59394c7a9948d0a58073fa98_s010-3.jpg', 'sub', '2025-02-27'),
	(170, 34, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/99b44a18b7744579966086205284455d_d010.jpg', 'desc', '2025-02-27'),
	(171, 35, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/a4c30cbba242488a8836ee0995fc07d8_m011.jpg', 'main', '2025-02-27'),
	(172, 35, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/5fb4960613424a6096227d388c7c9dda_s011-1.jpg', 'sub', '2025-02-27'),
	(173, 35, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/58213aac6ebc45e7b785b4f914c3fb45_s011-2.jpg', 'sub', '2025-02-27'),
	(174, 35, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/7a234dc716af404db07b1f1cea631253_s011-3.jpg', 'sub', '2025-02-27'),
	(175, 35, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/27131fa716b541c289b49f3ec5e264b0_d011.jpg', 'desc', '2025-02-27'),
	(176, 36, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fe01457f31164d3dbce11a4d32c8084a_m012.jpg', 'main', '2025-02-27'),
	(177, 36, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/2bb1c925880342cf8b9e79005110094b_s012-1.jpg', 'sub', '2025-02-27'),
	(178, 36, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d08cb7e91563497b8ac30baf7b2f63f3_s012-2.jpg', 'sub', '2025-02-27'),
	(179, 36, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8f13a044f39c4a0590ac73651f9bbf91_s012-3.jpg', 'sub', '2025-02-27'),
	(180, 36, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/f686a0df349b43a6bc99f6b22ba214b4_d012.jpg', 'desc', '2025-02-27'),
	(181, 37, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c26dd61c006247a78a50ff492cefa1a3_m013.jpg', 'main', '2025-02-27'),
	(182, 37, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8b29c2a36a474007b45c99db13ae0593_s013-1.jpg', 'sub', '2025-02-27'),
	(183, 37, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e0905cfd313e494bbd62d717983b4204_s013-2.jpg', 'sub', '2025-02-27'),
	(184, 37, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c2af2ba800ef4ec28ab0a0d99924d21c_s013-3.jpg', 'sub', '2025-02-27'),
	(185, 37, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/36b5a7bfa44a4c9980046433d0caaf39_d013.jpg', 'desc', '2025-02-27'),
	(186, 38, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/48dfebb0ab094598b0e851aa32c8968e_m014.jpg', 'main', '2025-02-27'),
	(187, 38, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8990629faff54801b0e7cefb827095ed_s014-1.jpg', 'sub', '2025-02-27'),
	(188, 38, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/eddbc8e754b64b7eb0290ce12c91e59f_s014-2.jpg', 'sub', '2025-02-27'),
	(189, 38, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/d752a85531384669b400f9a38abcbfdd_s014-3.jpg', 'sub', '2025-02-27'),
	(190, 38, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/20d0bb5dc4c545718057f3a669e50e57_d014.jpg', 'desc', '2025-02-27'),
	(191, 39, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/07dfc810ffa8402ca3cc5447c0aeeb25_m015.jpg', 'main', '2025-02-27'),
	(192, 39, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8277b24641ad4dc1ba44f13b9bc108b7_s015-1.jpg', 'sub', '2025-02-27'),
	(193, 39, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/fdb8c9c4dc51406dbf8de52b9efba61a_s015-2.jpg', 'sub', '2025-02-27'),
	(194, 39, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/b6c026740e3f46a581ac043d9768fc99_s015-3.jpg', 'sub', '2025-02-27'),
	(195, 39, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/43b23658f5db491481c6cc206c1c7f45_d015.jpg', 'desc', '2025-02-27'),
	(196, 40, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9eb5e12cfb2341f1877dfceb00036405_m016.jpg', 'main', '2025-02-27'),
	(197, 40, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/e71b19957ea9438796829326a25e798f_s016-1.jpg', 'sub', '2025-02-27'),
	(198, 40, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/c66a338bca6e4596a11efbe879953c7f_s016-2.jpg', 'sub', '2025-02-27'),
	(199, 40, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/035aa7ad78ff41ac8fc2aed9229b5492_s016-3.jpg', 'sub', '2025-02-27'),
	(200, 40, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8732f34294f346d4be889fbd0e6dc468_d016.jpg', 'desc', '2025-02-27'),
	(201, NULL, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/12869c21588c46e28c7d606e35c4acf6_다운로드.jpg', 'ad', '2025-02-27'),
	(202, 41, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9c3f623b53b44a1b90b210c8dacb5c91_banner1.jpg', 'main', '2025-02-27'),
	(203, 41, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/9f11ac7c84cb4a5a8fdb0351bfae85d3_car-seat.png', 'sub', '2025-02-27'),
	(204, 41, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/21a0e2e5c0b54a45bcc30bdf4598a72d_stroller.png', 'sub', '2025-02-27'),
	(205, 41, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/315018255eda48a1a9ed915e1da32a71_user.png', 'sub', '2025-02-27'),
	(206, 41, NULL, 'https://storage.googleapis.com/babyloop-4264d.firebasestorage.app/imgs/8b95a82c7468469e9ab8e802ca3076f5_logo.png', 'desc', '2025-02-27');

-- 테이블 babyloop.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `user_id` varchar(100) NOT NULL,
  `user_pw` varchar(255) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_addr1` varchar(200) DEFAULT NULL,
  `user_addr2` varchar(200) DEFAULT NULL,
  `user_addr3` varchar(200) DEFAULT NULL,
  `user_gender` varchar(20) DEFAULT NULL,
  `user_birth` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT sysdate(),
  `points` int(11) DEFAULT 3000,
  `provider` varchar(50) DEFAULT '일반가입',
  `provider_id` varchar(255) DEFAULT NULL,
  `duration` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `provider_id` (`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.member:~25 rows (대략적) 내보내기
INSERT INTO `member` (`user_id`, `user_pw`, `user_name`, `user_email`, `user_phone`, `user_addr1`, `user_addr2`, `user_addr3`, `user_gender`, `user_birth`, `created_at`, `points`, `provider`, `provider_id`, `duration`) VALUES
	('aaaa1234', '$2a$10$h/rUW5QoRQeQPtpo8zV9vOSvJOB6zMjM1LPzvXD04Wx1aJK.GCaGC', '고영빈', 'maybelemon@naver.com', '01000000000', '34672', '대전 동구 판교1길 3', '1층', 'male', '2014-02-11T15:00:00.000Z', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('Google_ba87399de3', NULL, '장종민', 'maybelemon@naver.com', NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-27', 3000, 'Google', '100479560087823425784', NULL),
	('Naver_e8e6064ab4', NULL, '장종민', 'maybelemon@naver.com', NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-27', 3000, 'Naver', 'gNsD3W4kncgldAlqjtU-TTrRSN4YT2A9SB9VTAKlBdo', NULL),
	('testuser1', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '김지훈', 'testuser1@example.com', '010-1234-5678', '12345', '서울특별시 강남구', '서울특별시 역삼동 123-45', '남', '1990-06-15', '2025-02-27', 3500, '일반가입', NULL, '2025-05-01'),
	('testuser10', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '최영수', 'testuser10@example.com', '010-2345-6789', '55667', '강원도 춘천시', '강원도 동면 123-45', '남', '1987-05-06', '2025-02-27', 4000, '일반가입', NULL, '2026-02-14'),
	('testuser11', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '정하영', 'testuser11@example.com', '010-1234-5678', '99887', '충청북도 청주시', '충청북도 흥덕구 234-56', '여', '1992-04-12', '2025-02-27', 3700, '일반가입', NULL, '2026-03-01'),
	('testuser12', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '박서윤', 'testuser12@example.com', '010-5678-9012', '22334', '대전광역시 유성구', '대전광역시 구즉동 789-01', '여', '1993-10-05', '2025-02-27', 3800, '일반가입', NULL, '2026-04-15'),
	('testuser13', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '김준호', 'testuser13@example.com', '010-6789-0123', '44556', '경상북도 포항시', '경상북도 남구 890-12', '남', '1986-02-28', '2025-02-27', 3900, '일반가입', NULL, '2026-05-10'),
	('testuser14', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍미선', 'testuser14@example.com', '010-7890-1234', '66778', '전라남도 순천시', '전라남도 조례동 123-45', '여', '1996-11-22', '2025-02-27', 3200, '일반가입', NULL, '2026-06-01'),
	('testuser15', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '김영호', 'testuser15@example.com', '010-8901-2345', '77889', '경기도 화성시', '경기도 동탄 678-90', '남', '1994-01-13', '2025-02-27', 4000, '일반가입', NULL, '2026-07-01'),
	('testuser2', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '이은지', 'testuser2@example.com', '010-2345-6789', '54321', '부산광역시 해운대구', '부산광역시 우동 987-65', '여', '1985-11-20', '2025-02-27', 4000, '일반가입', NULL, '2025-06-15'),
	('testuser3', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '박수현', 'testuser3@example.com', '010-3456-7890', '67890', '대구광역시 중구', '대구광역시 동성로 678-90', '남', '1992-03-18', '2025-02-27', 3800, '일반가입', NULL, '2025-07-10'),
	('testuser4', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '최민지', 'testuser4@example.com', '010-4567-8901', '13579', '인천광역시 연수구', '인천광역시 송도동 456-78', '여', '1993-02-25', '2025-02-27', 3200, '일반가입', NULL, '2025-08-15'),
	('testuser5', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '정하늘', 'testuser5@example.com', '010-5678-9012', '24680', '경기도 성남시', '경기도 판교 123-45', '여', '1995-01-30', '2025-02-27', 3600, '일반가입', NULL, '2025-09-01'),
	('testuser6', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍유진', 'testuser6@example.com', '010-6789-0123', '98765', '서울특별시 마포구', '서울특별시 합정동 234-56', '남', '1988-09-10', '2025-02-27', 3900, '일반가입', NULL, '2025-10-10'),
	('testuser7', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '김태현', 'testuser7@example.com', '010-7890-1234', '19283', '울산광역시 남구', '울산광역시 옥동 345-67', '남', '1991-07-22', '2025-02-27', 3300, '일반가입', NULL, '2025-11-05'),
	('testuser8', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '이수빈', 'testuser8@example.com', '010-8901-2345', '11223', '경기도 고양시', '경기도 일산동구 567-89', '여', '1994-12-03', '2025-02-27', 3100, '일반가입', NULL, '2025-12-15'),
	('testuser9', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '박지훈', 'testuser9@example.com', '010-9012-3456', '33445', '전라북도 전주시', '전라북도 완산구 890-12', '남', '1990-08-17', '2025-02-27', 3500, '일반가입', NULL, '2026-01-01'),
	('user1', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동1', 'user1@example.com', '010-1111-0001', '10001', '서울', '강남', '남', '1990-01-01', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user10', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동10', 'user10@example.com', '010-1111-0010', '10010', '서울', '금천', '여', '1999-10-10', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user2', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동2', 'user2@example.com', '010-1111-0002', '10002', '서울', '서초', '여', '1991-02-02', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user3', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동3', 'user3@example.com', '010-1111-0003', '10003', '서울', '종로', '남', '1992-03-03', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user4', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동4', 'user4@example.com', '010-1111-0004', '10004', '서울', '마포', '여', '1993-04-04', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user5', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동5', 'user5@example.com', '010-1111-0005', '10005', '서울', '동대문', '남', '1994-05-05', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user6', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동6', 'user6@example.com', '010-1111-0006', '10006', '서울', '은평', '여', '1995-06-06', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user7', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동7', 'user7@example.com', '010-1111-0007', '10007', '서울', '중구', '남', '1996-07-07', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user8', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동8', 'user8@example.com', '010-1111-0008', '10008', '서울', '강서', '여', '1997-08-08', '2025-02-27', 3000, '일반가입', NULL, NULL),
	('user9', '$2a$10$0Bz.fsmsNv6bA1eI8D.7c.OhsvlOPo6nSmtXpbokThOZNRAZPeMwO', '홍길동9', 'user9@example.com', '010-1111-0009', '10009', '서울', '노원', '남', '1998-09-09', '2025-02-27', 3000, '일반가입', NULL, NULL);

-- 테이블 babyloop.messages 구조 내보내기
CREATE TABLE IF NOT EXISTS `messages` (
  `messages_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `report_count` int(11) DEFAULT 1,
  `read_status` int(11) DEFAULT 0,
  PRIMARY KEY (`messages_id`),
  KEY `fk_messages_user` (`user_id`),
  KEY `fk_messages_products` (`product_id`),
  CONSTRAINT `fk_messages_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.messages:~40 rows (대략적) 내보내기
INSERT INTO `messages` (`messages_id`, `product_id`, `user_id`, `report_count`, `read_status`) VALUES
	(1, 1, NULL, NULL, 0),
	(2, 2, NULL, NULL, 0),
	(3, 3, NULL, NULL, 0),
	(4, 4, NULL, NULL, 0),
	(5, 5, NULL, NULL, 0),
	(6, 6, NULL, NULL, 0),
	(7, 7, NULL, NULL, 0),
	(8, 8, NULL, NULL, 0),
	(9, 9, NULL, NULL, 0),
	(10, 10, NULL, NULL, 0),
	(11, 11, NULL, NULL, 0),
	(12, 12, NULL, NULL, 0),
	(13, 13, NULL, NULL, 0),
	(14, 14, NULL, NULL, 0),
	(15, 15, NULL, NULL, 0),
	(16, 16, NULL, NULL, 0),
	(17, 17, NULL, NULL, 0),
	(18, 18, NULL, NULL, 0),
	(19, 19, NULL, NULL, 0),
	(20, 20, NULL, NULL, 0),
	(21, 21, NULL, NULL, 0),
	(22, 22, NULL, NULL, 0),
	(23, 23, NULL, NULL, 0),
	(24, 24, NULL, NULL, 0),
	(25, 25, NULL, NULL, 0),
	(26, 26, NULL, NULL, 0),
	(27, 27, NULL, NULL, 0),
	(28, 28, NULL, NULL, 0),
	(29, 29, NULL, NULL, 0),
	(30, 30, NULL, NULL, 0),
	(31, 31, NULL, NULL, 0),
	(32, 32, NULL, NULL, 0),
	(33, 33, NULL, NULL, 0),
	(34, 34, NULL, NULL, 0),
	(35, 35, NULL, NULL, 0),
	(36, 36, NULL, NULL, 0),
	(37, 37, NULL, NULL, 0),
	(38, 38, NULL, NULL, 0),
	(39, 39, NULL, NULL, 0),
	(40, 40, NULL, NULL, 0),
	(41, 41, NULL, NULL, 0);

-- 테이블 babyloop.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(200) NOT NULL,
  `notice_com` varchar(4000) NOT NULL,
  `created_at` date DEFAULT sysdate(),
  `update_at` date DEFAULT sysdate(),
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.notice:~0 rows (대략적) 내보내기

-- 테이블 babyloop.payinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `payinfo` (
  `payment_id` int(11) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `user_depoints` int(11) DEFAULT 0,
  `user_addpoints` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `create_at` date DEFAULT sysdate(),
  KEY `fk_payinfo_user` (`user_id`),
  KEY `fk_payinfo_payment` (`payment_id`),
  CONSTRAINT `fk_payinfo_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment_items` (`payment_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_payinfo_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.payinfo:~0 rows (대략적) 내보내기

-- 테이블 babyloop.payment_items 구조 내보내기
CREATE TABLE IF NOT EXISTS `payment_items` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_product` (`product_id`),
  CONSTRAINT `fk_payment_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.payment_items:~0 rows (대략적) 내보내기

-- 테이블 babyloop.products 구조 내보내기
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(1000) DEFAULT NULL,
  `product_name` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `created_at` date DEFAULT sysdate(),
  `updated_at` date DEFAULT sysdate(),
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.products:~41 rows (대략적) 내보내기
INSERT INTO `products` (`product_id`, `category`, `product_name`, `description`, `stock`, `price`, `created_at`, `updated_at`) VALUES
	(1, '바운서', '바운스베이비', '아기에게 편안한 휴식을 제공하는 바운서로, 부드러운 스윙 기능과 안정적인 디자인이 특징입니다. 부모님도 안심하고 사용할 수 있는 제품입니다.', 120, 50000, '2025-02-27', '2025-02-27'),
	(2, '바운서', '해피스윙', '아이의 행복한 시간을 위한 바운서. 다양한 각도로 조절이 가능하며, 내구성이 뛰어난 재질로 오래 사용 가능합니다.', 150, 45000, '2025-02-27', '2025-02-27'),
	(3, '바운서', '편안한동작', '부드러운 흔들림으로 아기의 편안한 잠자리를 제공합니다. 실용적인 디자인으로 부모님들의 사용 편의성도 높입니다.', 100, 48000, '2025-02-27', '2025-02-27'),
	(4, '바운서', '쿨바운스', '여름철에도 시원하게 사용할 수 있는 바운서입니다. 통풍이 잘 되는 메쉬 소재로 아기의 피부에 자극 없이 사용할 수 있습니다.', 80, 55000, '2025-02-27', '2025-02-27'),
	(5, '바운서', '부드러운움직임', '부드럽고 고급스러운 움직임이 특징인 바운서로, 아기를 편안하게 진정시킬 수 있습니다. 프리미엄 소재로 만들어져 고급스러운 느낌을 제공합니다.', 50, 60000, '2025-02-27', '2025-02-27'),
	(6, '바운서', '꿈결바운서', '아기가 꿈을 꾸듯 편안한 시간과 환경을 제공하는 바운서입니다. 다양한 기능이 탑재되어 있어 아기의 성장에 맞춰 사용 가능합니다.', 60, 70000, '2025-02-27', '2025-02-27'),
	(7, '바운서', '스윙존', '안정적인 스윙 기능을 자랑하는 바운서로, 간편한 조작과 손쉬운 청소가 가능한 제품입니다. 실용적인 기능을 강조합니다.', 200, 40000, '2025-02-27', '2025-02-27'),
	(8, '바운서', '바운스플러스', '아기의 안락함과 부모님의 편리함을 동시에 고려한 바운서로, 여러 가지 편의 기능이 포함되어 있습니다. 휴대도 용이하고, 다기능성을 자랑합니다.', 90, 65000, '2025-02-27', '2025-02-27'),
	(9, '바운서', '릴렉스핏', '아기의 몸에 맞는 편안한 착석감을 제공합니다. 부드러운 패딩 처리로 아기가 더욱 편안하게 쉴 수 있습니다.', 110, 50000, '2025-02-27', '2025-02-27'),
	(10, '바운서', '조이바운스', '아기와 함께하는 즐거운 시간을 위한 바운서로, 다양한 색상과 패턴을 선택할 수 있습니다. 활동적인 아기에게 적합한 디자인입니다.', 130, 45000, '2025-02-27', '2025-02-27'),
	(11, '바운서', '라이트스윙', '가벼운 스윙이 특징인 바운서로, 집안 어디서든 쉽게 이동할 수 있습니다. 내구성이 강하고, 부드러운 스윙 기능으로 아기를 진정시킬 수 있습니다.', 170, 42000, '2025-02-27', '2025-02-27'),
	(12, '바운서', '트윙클바운스', '별빛처럼 반짝이는 디자인과 안정적인 스윙 기능이 특징입니다. 아기의 웃음소리가 더욱 반짝이는 시간으로 만들어줄 바운서입니다.', 90, 55000, '2025-02-27', '2025-02-27'),
	(13, '바운서', '컴포트웨이브', '편안한 파도처럼 부드럽게 흔들리며 아기를 진정시키는 바운서. 뛰어난 디자인과 편안한 소재로 아기의 휴식 시간을 보장합니다.', 80, 65000, '2025-02-27', '2025-02-27'),
	(14, '바운서', '플로우바운스', '아기의 자연스러운 흐름을 따라 움직이는 바운서로, 부드럽고 유연한 스윙을 제공합니다. 아기의 수면을 돕는 최고의 선택입니다.', 100, 60000, '2025-02-27', '2025-02-27'),
	(15, '바운서', '스윙트랙', '아기가 편안하게 흔들릴 수 있도록 설계된 바운서로, 내구성이 뛰어난 재질로 오랫동안 사용 가능합니다. 간편한 조작으로 부모님도 쉽게 사용할 수 있습니다.', 150, 47000, '2025-02-27', '2025-02-27'),
	(16, '바운서', '스마트바운서', '스마트폰과 연결하여 다양한 기능을 조작할 수 있는 혁신적인 바운서입니다. 아기와 부모 모두의 편리함을 고려한 첨단 기술이 탑재되었습니다.', 70, 75000, '2025-02-27', '2025-02-27'),
	(17, '보행기&러닝홈', '스텝업 보행기', '아기의 첫 걸음을 지원하는 보행기입니다. 안전한 브레이크 시스템과 튼튼한 프레임을 갖추어 부모님이 안심하고 사용할 수 있습니다. 다양한 기능과 아기 성장에 맞춰 조정 가능한 디자인으로, 아기의 발달을 돕습니다.', 120, 55000, '2025-02-27', '2025-02-27'),
	(18, '보행기&러닝홈', '조이플 보행기', '밝고 귀여운 디자인으로 아기에게 즐거운 시간을 제공합니다. 여러 가지 장난감이 탑재되어 아기의 호기심을 자극하며, 편안한 시트와 부드러운 바퀴로 안정적인 사용이 가능합니다. 이동도 용이하여 집안 어디서든 편리하게 사용할 수 있습니다.', 90, 65000, '2025-02-27', '2025-02-27'),
	(19, '아기침대', '슬립앤드림 아기침대', '아기의 편안한 수면을 위한 침대입니다. 고급 메모리폼 매트리스와 통기성이 좋은 커버로 아기의 피부에 자극 없이 편안한 수면 환경을 제공합니다. 안전한 그레인프리 소재로 부모님이 안심하고 사용할 수 있습니다.', 80, 120000, '2025-02-27', '2025-02-27'),
	(20, '아기침대', '드림베이비 아기침대', '부드러운 나무 프레임과 편안한 침대 매트리스로 아기를 위한 안락한 잠자리를 제공합니다. 침대의 높낮이 조절이 가능하여 아기의 성장에 맞춰 사용할 수 있습니다. 아기에게 최적화된 설계로 편안한 잠을 보장합니다.', 60, 135000, '2025-02-27', '2025-02-27'),
	(21, '아기침대', '베이비컴포트 아기침대', '아기의 편안한 잠을 위해 설계된 침대입니다. 매트리스는 아기의 체중에 맞춰 편안한 지지력을 제공합니다. 또한, 침대 측면에 통풍 구멍이 있어 아기가 자는 동안 쾌적한 환경을 유지할 수 있습니다.', 100, 110000, '2025-02-27', '2025-02-27'),
	(22, '아기침대', '하모니 아기침대', '아기와 부모가 모두 만족할 수 있는 하모니 아기침대. 고급 나무 프레임과 인체공학적으로 설계된 매트리스로 아기의 건강한 수면을 지원합니다. 침대의 이동이 간편하여 집안 어디서든 편리하게 사용할 수 있습니다.', 70, 125000, '2025-02-27', '2025-02-27'),
	(23, '아기침대', '클라우드베이비 아기침대', '구름처럼 부드러운 소재로 만들어진 클라우드베이비 아기침대는 아기의 편안한 수면을 위해 설계되었습니다. 고급 패브릭과 안전한 소재로 아기의 피부를 보호하며, 침대의 높낮이를 조절할 수 있어 실용성이 뛰어납니다.', 50, 140000, '2025-02-27', '2025-02-27'),
	(24, '쏘서&점퍼루', '조이플 점퍼루', '아기가 즐겁게 뛰고 놀 수 있는 점퍼루입니다. 다채로운 장난감이 부착되어 아기의 호기심을 자극하며, 튼튼한 프레임과 부드러운 시트로 안전하고 편안한 놀이 공간을 제공합니다.', 100, 85000, '2025-02-27', '2025-02-27'),
	(25, '쏘서&점퍼루', '스프링점퍼 쏘서', '아기의 발달에 맞춰 조정 가능한 쏘서입니다. 탄력 있는 스프링으로 아기가 편안하게 뛰어놀 수 있으며, 활동적인 아기에게 적합한 다양한 장난감이 포함되어 있습니다.', 120, 95000, '2025-02-27', '2025-02-27'),
	(26, '쏘서&점퍼루', '트윙클점퍼', '별빛처럼 반짝이는 디자인과 다채로운 장난감으로 아기의 놀이 시간을 더욱 즐겁게 만들어주는 점퍼루입니다. 안전한 프레임과 안정적인 바닥 구조로 아기를 보호합니다.', 110, 90000, '2025-02-27', '2025-02-27'),
	(27, '쏘서&점퍼루', '하이퍼 점퍼', '다양한 기능과 활동을 즐길 수 있는 점퍼루입니다. 내구성이 뛰어난 프레임과 아기의 안전을 고려한 설계로 안심하고 사용할 수 있습니다. 아기의 성격에 맞춰 다양한 각도로 조정 가능합니다.', 150, 80000, '2025-02-27', '2025-02-27'),
	(28, '쏘서&점퍼루', '베이비프렌즈 쏘서', '아기의 건강한 발달을 돕는 기능성 쏘서로, 부드럽고 안정적인 디자인으로 아기가 편안하게 사용할 수 있습니다. 간편하게 이동할 수 있어 집안 곳곳에서 사용 가능합니다.', 200, 70000, '2025-02-27', '2025-02-27'),
	(29, '쏘서&점퍼루', '베이비타임 점퍼', '아기가 뛰고 놀 수 있는 공간을 제공하는 점퍼루로, 다양한 색상과 디자인으로 아기의 관심을 끌며 장난감과 음악 기능이 함께 제공됩니다.', 130, 85000, '2025-02-27', '2025-02-27'),
	(30, '쏘서&점퍼루', '패밀리 쏘서', '아기의 성장을 지원하는 패밀리 쏘서. 탄탄한 구조와 다양한 기능으로 아기가 뛰놀기에 적합하며, 부모가 손쉽게 청소할 수 있는 디자인입니다.', 90, 100000, '2025-02-27', '2025-02-27'),
	(31, '쏘서&점퍼루', '소프트점퍼루', '부드러운 소재로 만들어져 아기의 피부를 보호하며, 안전한 놀이를 제공합니다. 다양한 장난감이 함께 제공되어 아기의 창의성을 키울 수 있습니다.', 140, 75000, '2025-02-27', '2025-02-27'),
	(32, '쏘서&점퍼루', '플레이타임 쏘서', '아기가 뛰어놀 수 있는 재미있는 쏘서입니다. 여러 가지 장난감과 함께 손쉬운 조작으로 부모님도 편리하게 사용할 수 있습니다.', 110, 80000, '2025-02-27', '2025-02-27'),
	(33, '쏘서&점퍼루', '스마일 점퍼', '웃음이 끊이지 않는 아기들을 위한 점퍼루입니다. 다양한 액티비티와 장난감이 탑재되어 아기가 지루할 틈 없이 즐길 수 있습니다.', 80, 90000, '2025-02-27', '2025-02-27'),
	(34, '쏘서&점퍼루', '하이펀 점퍼', '아기가 뛰어놀 수 있는 최적의 환경을 제공하는 점퍼루입니다. 안전한 브레이크 시스템과 다양한 색상의 장난감이 아기와 부모님 모두를 만족시킵니다.', 70, 95000, '2025-02-27', '2025-02-27'),
	(35, '쏘서&점퍼루', '루루 점퍼', '편안한 착석감과 다양한 액티비티가 제공되는 점퍼루입니다. 아기의 발달에 맞춰 조정할 수 있어 오랫동안 사용할 수 있습니다.', 120, 85000, '2025-02-27', '2025-02-27'),
	(36, '쏘서&점퍼루', '엔젤 쏘서', '귀여운 천사 디자인이 특징인 쏘서입니다. 아기에게 편안한 놀이 환경을 제공하며, 안전하고 튼튼한 프레임이 특징입니다.', 150, 70000, '2025-02-27', '2025-02-27'),
	(37, '쏘서&점퍼루', '트리플 점퍼', '세 가지 놀이 모드를 지원하는 점퍼루입니다. 다양한 장난감과 함께 제공되며, 아기가 뛰는 즐거움을 더욱 배가시킬 수 있습니다.', 60, 95000, '2025-02-27', '2025-02-27'),
	(38, '쏘서&점퍼루', '딜라이트 점퍼', '아기가 기쁨과 즐거움을 느낄 수 있는 점퍼루입니다. 풍부한 장난감과 다양한 소리 기능으로 아기의 발달을 촉진시킬 수 있습니다.', 90, 85000, '2025-02-27', '2025-02-27'),
	(39, '쏘서&점퍼루', '엘리트 쏘서', '아기의 성장에 맞춘 여러 기능을 제공하는 쏘서입니다. 뛰어난 내구성으로 아기가 안전하게 사용할 수 있으며, 여러 가지 색상과 디자인이 매력적입니다.', 80, 100000, '2025-02-27', '2025-02-27'),
	(40, '쏘서&점퍼루', '키즈존 점퍼', '아기의 뛰어난 발달을 돕는 점퍼루입니다. 다양한 색상과 장난감이 아기에게 즐거운 시간을 선사하며, 부모가 쉽게 조작할 수 있는 기능이 추가되어 있습니다.', 100, 90000, '2025-02-27', '2025-02-27'),
	(41, '바운서', '물건1', '물건1입니다.', 11, 10000, '2025-02-27', '2025-02-27');

-- 테이블 babyloop.question_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `question_board` (
  `board_IDX` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `board_TITLE` varchar(100) NOT NULL,
  `board_COMMENT` varchar(2000) NOT NULL,
  `board_blind` tinyint(1) NOT NULL DEFAULT 0,
  `board_COUNT` int(11) DEFAULT 0,
  `flag` varchar(100) NOT NULL,
  `CREATED_AT` date NOT NULL DEFAULT sysdate(),
  `UPDATED_AT` date NOT NULL DEFAULT sysdate(),
  PRIMARY KEY (`board_IDX`),
  KEY `fk_question_board_user` (`user_id`),
  CONSTRAINT `fk_question_board_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.question_board:~0 rows (대략적) 내보내기

-- 테이블 babyloop.recommendation 구조 내보내기
CREATE TABLE IF NOT EXISTS `recommendation` (
  `product_id` int(11) NOT NULL,
  `review_id` int(11) DEFAULT NULL,
  `like_count` int(11) DEFAULT 0,
  `rental_count` int(11) DEFAULT 0,
  `view_count` int(11) DEFAULT 0,
  `rating_avg` float DEFAULT 0,
  `search_count` int(11) DEFAULT 0,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_recommendation_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.recommendation:~41 rows (대략적) 내보내기
INSERT INTO `recommendation` (`product_id`, `review_id`, `like_count`, `rental_count`, `view_count`, `rating_avg`, `search_count`) VALUES
	(1, NULL, 0, 0, 4, 0, 0),
	(2, NULL, 0, 0, 11, 0, 0),
	(3, NULL, 0, 0, 0, 0, 0),
	(4, NULL, 0, 0, 0, 0, 0),
	(5, NULL, 0, 0, 0, 0, 0),
	(6, NULL, 0, 0, 500, 0, 0),
	(7, NULL, 0, 0, 0, 0, 0),
	(8, NULL, 0, 0, 0, 0, 0),
	(9, NULL, 0, 0, 0, 0, 0),
	(10, NULL, 0, 0, 0, 0, 0),
	(11, NULL, 0, 0, 0, 0, 0),
	(12, NULL, 0, 0, 0, 0, 0),
	(13, NULL, 0, 0, 0, 0, 0),
	(14, NULL, 0, 0, 0, 0, 0),
	(15, NULL, 0, 0, 0, 0, 0),
	(16, NULL, 0, 0, 52, 0, 0),
	(17, NULL, 0, 0, 0, 0, 0),
	(18, NULL, 0, 0, 0, 0, 0),
	(19, NULL, 0, 0, 0, 0, 0),
	(20, NULL, 0, 0, 0, 0, 0),
	(21, NULL, 0, 0, 0, 0, 0),
	(22, NULL, 0, 0, 0, 0, 0),
	(23, NULL, 0, 0, 0, 0, 0),
	(24, NULL, 0, 0, 0, 0, 0),
	(25, NULL, 0, 0, 0, 0, 0),
	(26, NULL, 0, 0, 0, 0, 0),
	(27, NULL, 0, 0, 0, 0, 0),
	(28, NULL, 0, 0, 3, 0, 0),
	(29, NULL, 0, 0, 0, 0, 0),
	(30, NULL, 0, 0, 0, 0, 0),
	(31, NULL, 0, 0, 3, 0, 0),
	(32, NULL, 0, 0, 0, 0, 0),
	(33, NULL, 0, 0, 0, 0, 0),
	(34, NULL, 0, 0, 3, 0, 0),
	(35, NULL, 0, 0, 0, 0, 0),
	(36, NULL, 0, 0, 15, 0, 0),
	(37, NULL, 0, 0, 0, 0, 0),
	(38, NULL, 0, 0, 5, 0, 0),
	(39, NULL, 0, 0, 3, 0, 0),
	(40, NULL, 0, 0, 31, 0, 0),
	(41, NULL, 0, 0, 14, 0, 0);

-- 테이블 babyloop.rentals 구조 내보내기
CREATE TABLE IF NOT EXISTS `rentals` (
  `rental_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_price` int(11) NOT NULL,
  `status` varchar(100) DEFAULT '대여중',
  `rental_start` date NOT NULL,
  `rental_end` date NOT NULL,
  `created_at` date DEFAULT sysdate(),
  `payment_key` varchar(100) DEFAULT NULL,
  `approved_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`rental_id`),
  KEY `fk_rentals_user` (`user_id`),
  CONSTRAINT `fk_rentals_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.rentals:~0 rows (대략적) 내보내기

-- 테이블 babyloop.review 구조 내보내기
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `rating` int(11) DEFAULT 0,
  `review_text` varchar(2000) DEFAULT NULL,
  `review_like` int(11) DEFAULT 0,
  `created_at` date NOT NULL DEFAULT sysdate(),
  PRIMARY KEY (`review_id`),
  KEY `fk_review_user` (`user_id`),
  CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.review:~10 rows (대략적) 내보내기
INSERT INTO `review` (`review_id`, `product_id`, `user_id`, `rating`, `review_text`, `review_like`, `created_at`) VALUES
	(1, 1, 'user1', 5, '정말 좋은 제품입니다! 추천합니다.', 10, '2025-02-27'),
	(2, 1, 'user2', 4, '생각보다 괜찮아요. 재구매 의사 있습니다.', 5, '2025-02-27'),
	(3, 1, 'user3', 3, '기능은 만족스러운데 배송이 늦었어요.', 2, '2025-02-27'),
	(4, 1, 'user4', 5, '이 가격에 이런 품질이라니! 대박!', 8, '2025-02-27'),
	(5, 1, 'user5', 2, '조금 실망스러웠어요. 기대보다 별로네요.', 1, '2025-02-27'),
	(6, 1, 'user6', 4, '디자인이 마음에 들어요! 가볍고 편리해요.', 6, '2025-02-27'),
	(7, 1, 'user7', 3, '사용하는 데 큰 문제는 없지만 아쉬운 점이 있네요.', 3, '2025-02-27'),
	(8, 1, 'user8', 5, '완전 만족! 주변에 추천하고 싶어요.', 12, '2025-02-27'),
	(9, 1, 'user9', 4, '가격 대비 성능이 괜찮은 제품입니다.', 4, '2025-02-27'),
	(10, 1, 'user10', 1, '기대 이하였습니다. 개선이 필요해요.', 0, '2025-02-27');

-- 테이블 babyloop.viewhistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `viewhistory` (
  `view_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`view_id`),
  KEY `fk_viewhistory_user` (`user_id`),
  KEY `fk_viewhistory_product` (`product_id`),
  CONSTRAINT `fk_viewhistory_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_viewhistory_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.viewhistory:~0 rows (대략적) 내보내기

-- 테이블 babyloop.wishlist 구조 내보내기
CREATE TABLE IF NOT EXISTS `wishlist` (
  `wish_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`wish_id`),
  KEY `fk_wishlist_user` (`user_id`),
  KEY `fk_wishlist_product` (`product_id`),
  CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `member` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 babyloop.wishlist:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
