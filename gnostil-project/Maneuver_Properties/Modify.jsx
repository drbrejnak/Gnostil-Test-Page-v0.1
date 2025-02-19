import * as React from "react"
import {motion} from "framer-motion"

const Modify = (props) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" preserveAspectRatio="xMinYMax meet" {...props}>
    <motion.g>
      <title>{"Expression 1"}</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
        duration: 5,
        ease: "linear",
        repeat: 0,
        }}
        fill="none"
        stroke="yellow"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={5}
        d="
M 999.4824 271.53127
C 990.15131 271.50231 989.00731 271.72549 982.79686 274.78127
C 971.4747 280.35221 964.04489 290.39896 961.83787 303.12307
C 960.77962 309.22423 959.67612 310.99447 936.32225 344.00002
C 922.89603 362.97502 911.57394 378.61815 911.16209 378.76369
C 910.75023 378.90922 909.80266 377.34486 909.05858 375.28713
C 906.93783 369.42232 897.57084 360.7343 890.49217 358.06643
C 882.52215 355.06262 869.82989 355.4597 862.99998 358.9258
C 851.16892 364.92992 843.83397 376.63799 843.83397 389.5176
C 843.83397 391.98289 843.6293 394.00002 843.37889 394.00002
C 842.82441 394.00002 788.18188 381.08995 785.82616 380.40236
C 784.9058 380.13372 782.73668 377.70707 781.00584 375.00979
C 776.82985 368.50208 770.98649 363.35483 764.11912 360.13479
C 759.22129 357.83824 757.21496 357.50002 748.49998 357.50002
C 739.79234 357.50002 737.78918 357.83663 732.99998 360.10939
C 716.57698 367.90307 707.31308 386.19904 711.29686 402.97268
L 712.83397 409.44338
L 700.25389 429.97268
C 693.33489 441.26315 686.17357 452.86837 684.33983 455.76369
L 681.00584 461.02932
L 675.6035 456.62893
C 657.91467 442.22118 631.79419 448.04257 622.34178 468.50002
C 618.91177 475.92342 618.40738 487.83395 621.23045 494.72072
L 622.96092 498.94143
L 620.23045 498.42385
C 618.72877 498.13863 599.47835 494.84293 577.45116 491.09963
L 537.40038 484.29299
L 532.75194 480.74416
C 513.90615 466.35883 486.06584 473.67767 475.74608 495.73049
C 473.11087 501.36181 472.63206 503.57996 472.57616 510.43166
C 472.49738 520.09149 474.63509 527.05822 479.72069 533.72072
C 483.24209 538.334 483.25346 538.38891 490.08397 578.41994
C 493.84537 600.46408 497.15352 619.72881 497.43358 621.23049
L 497.94139 623.96096
L 493.72069 622.23049
C 486.91265 619.43969 474.8658 619.86256 467.88084 623.13674
C 457.04917 628.21406 450.39335 636.65895 448.00975 648.35158
C 446.05721 657.92968 448.84281 668.27321 455.61522 676.58791
L 460.00194 681.97463
L 456.24999 684.33401
C 454.18702 685.63204 442.55504 692.79018 430.40038 700.24026
L 408.30077 713.78518
L 402.93358 712.3926
C 396.05505 710.60833 391.81845 710.63655 384.61913 712.51174
C 373.2786 715.46557 364.2066 723.05919 359.16014 733.82424
C 356.8353 738.78356 356.49999 740.76136 356.49999 749.50002
C 356.49999 758.18233 356.84319 760.23006 359.10155 765.04495
C 362.41457 772.10837 367.11069 777.45038 373.73631 781.69143
C 376.73409 783.61031 379.19381 785.99608 379.49022 787.27151
C 382.48445 800.1555 392.2092 840.90357 392.61131 842.25002
C 393.03625 843.67296 392.50717 844.00002 389.77733 844.00002
C 383.97614 844.00002 374.70177 846.94753 369.32616 850.50002
C 348.0954 864.53048 350.14147 897.42026 372.95506 908.82034
L 378.74413 911.71292
L 343.71483 936.50198
C 309.98792 960.37105 308.43779 961.33985 301.94921 962.5762
C 284.81262 965.84143 272.67955 977.93956 270.18358 994.25003
C 266.99202 1015.1059 281.58604 1034.4612 302.99999 1037.7715
C 308.05545 1038.553 311.33835 1040.6302 343.61913 1063.4571
L 378.73827 1088.291
L 372.95311 1091.1817
C 352.16552 1101.5694 348.21059 1129.5905 365.19139 1146.1739
C 370.6488 1151.5036 378.0951 1154.7275 387.13085 1155.6719
C 391.92922 1156.1734 392.95325 1156.5918 392.56639 1157.8946
C 392.19781 1159.1358 382.27453 1200.7478 379.49022 1212.7285
C 379.19381 1214.0039 376.73409 1216.3897 373.73631 1218.3086
C 367.11069 1222.5496 362.41457 1227.8917 359.10155 1234.9551
C 356.84235 1239.7718 356.49999 1241.8168 356.49999 1250.5157
C 356.49999 1259.8082 356.73562 1261.0116 359.77342 1267.1875
C 367.68518 1283.2722 386.33226 1292.1511 402.83202 1287.6914
L 408.16405 1286.25
L 420.83202 1293.9492
C 432.61387 1301.1096 447.32431 1310.1407 456.31053 1315.7305
L 460.11913 1318.0996
L 457.2617 1321.3535
C 449.30396 1330.4169 446.05995 1340.7392 447.9453 1350.9922
C 450.16978 1363.0894 456.77039 1371.6557 467.88084 1376.8653
C 472.62426 1379.0895 474.8258 1379.4895 481.99999 1379.4375
C 487.62389 1379.3968 491.79335 1378.8132 494.3242 1377.709
L 498.15038 1376.0391
L 497.56249 1378.7696
C 497.23902 1380.2713 493.87801 1399.5789 490.09374 1421.6758
C 483.42071 1460.6405 483.11822 1461.9699 480.0742 1465.7578
C 468.64011 1479.986 470.15922 1502.21 483.47459 1515.5254
C 496.78859 1528.8394 519.0133 1530.3593 533.23827 1518.9278
C 537.02495 1515.8848 538.33341 1515.5885 577.3203 1508.9453
C 599.41888 1505.1798 618.72877 1501.8646 620.23045 1501.5782
L 622.96092 1501.0586
L 621.23045 1505.2793
C 620.07739 1508.0921 619.50466 1512.1842 619.51366 1517.5469
C 619.52509 1524.6051 619.92879 1526.4142 622.80467 1532.2559
C 632.98212 1552.9292 658.83901 1557.8124 676.78514 1542.4512
L 680.91991 1538.9121
L 683.30272 1542.7071
C 707.21233 1580.7619 712.99792 1590.8785 712.14061 1593.1446
C 705.78395 1609.9475 715.42259 1631.5492 732.99998 1639.8907
C 737.78918 1642.1635 739.79234 1642.5 748.49998 1642.5
C 757.21496 1642.5 759.22129 1642.1619 764.11912 1639.8653
C 771.00282 1636.6376 776.83145 1631.4965 781.03905 1624.9395
C 782.78808 1622.2139 785.18218 1619.7579 786.35936 1619.4825
C 787.53653 1619.207 800.7217 1616.0602 815.66014 1612.4903
C 830.59859 1608.9205 843.04989 1606 843.32811 1606
C 843.60633 1606 843.83397 1608.0172 843.83397 1610.4825
C 843.83397 1623.3621 851.16892 1635.0701 862.99998 1641.0742
C 869.82989 1644.5403 882.52215 1644.9374 890.49217 1641.9336
C 897.57084 1639.2657 906.93783 1630.5777 909.05858 1624.7129
C 909.80266 1622.6552 910.75023 1621.0908 911.16209 1621.2364
C 911.57394 1621.3819 922.89603 1637.025 936.32225 1656
C 959.67612 1689.0055 960.77962 1690.7758 961.83787 1696.877
C 964.3906 1711.5943 974.2248 1723.0219 988.28514 1727.6075
C 990.92571 1728.4686 995.67369 1728.8654 1001 1728.67
C 1007.8762 1728.4177 1010.6424 1727.811 1015.4785 1725.4981
C 1026.7976 1720.0846 1035.1982 1708.7332 1036.7578 1696.7442
C 1037.4629 1691.3238 1038.741 1689.2823 1062.5 1655.6543
L 1087.5 1620.2715
L 1090 1625.17
C 1093.2607 1631.561 1099.2035 1637.5548 1105.4726 1640.7735
C 1109.3831 1642.7812 1112.3884 1643.4477 1119 1643.7735
C 1130.3356 1644.3319 1137.3245 1641.8167 1144.5078 1634.5957
C 1151.0113 1628.0581 1154.1374 1621.4066 1154.7734 1612.75
C 1155.0462 1609.0375 1155.3938 1606 1155.5469 1606
C 1155.7 1606 1168.9852 1609.15 1185.0703 1613
C 1201.1553 1616.85 1214.4619 1620 1214.6387 1620
C 1214.8155 1620 1215.8318 1621.7101 1216.8984 1623.8008
C 1219.8846 1629.6542 1226.8302 1635.9929 1234 1639.4063
C 1239.8521 1642.1924 1241.4469 1642.5 1250 1642.5
C 1258.6046 1642.5 1260.1336 1642.1999 1266.2246 1639.3145
C 1279.2056 1633.1652 1286.951 1621.8628 1287.789 1607.8457
C 1288.0407 1603.6363 1287.7181 1597.9911 1287.0722 1595.2989
L 1285.8965 1590.4024
L 1301.5254 1564.9571
C 1310.1214 1550.9618 1317.333 1539.333 1317.5508 1539.1153
C 1317.7685 1538.8976 1319.738 1540.3381 1321.9277 1542.3164
C 1344.0521 1562.3045 1379.1256 1547.2777 1379.1406 1517.8047
C 1379.1427 1513.6547 1378.4595 1508.5967 1377.5605 1506.0938
C 1376.69 1503.6705 1376.0969 1501.574 1376.2402 1501.4356
C 1376.3836 1501.2971 1395.4883 1504.446 1418.6953 1508.4317
C 1456.0518 1514.8475 1461.2688 1515.9671 1464.1953 1518.1953
C 1473.2406 1525.0822 1484.8385 1528.1081 1494.6601 1526.1446
C 1507.1839 1523.641 1516.9883 1516.3059 1522.5879 1505.25
C 1525.2541 1499.9859 1525.5 1498.6133 1525.5 1489
C 1525.5 1477.501 1523.9922 1472.6035 1518.164 1465.17
C 1515.4567 1461.7169 1514.8622 1459.0117 1508.1289 1419.5
C 1504.1923 1396.4 1500.9763 1377.2314 1500.9863 1376.9043
C 1500.9941 1376.5771 1503.5875 1377.1883 1506.75 1378.2617
C 1518.1316 1382.125 1532.2332 1378.7668 1540.8633 1370.1367
C 1547.299 1363.701 1550.2656 1356.9208 1550.7676 1347.5
C 1551.3023 1337.4626 1548.859 1330.2838 1542.5 1323.211
L 1538.1074 1318.3242
L 1564.3125 1302.2461
L 1590.5176 1286.168
L 1596.0097 1287.6504
C 1612.2597 1292.0375 1631.6528 1282.9055 1638.9199 1267.4453
C 1647.2968 1249.6241 1641.1858 1227.9352 1625.1289 1218.5
C 1622.3209 1216.85 1619.8103 1214.825 1619.5488 1214
C 1618.8484 1211.7902 1606 1157.6571 1606 1156.916
C 1606 1156.5684 1608.754 1155.9963 1612.1191 1155.6446
C 1624.7017 1154.3295 1636.2432 1146.252 1641.3066 1135.2168
C 1644.6154 1128.0058 1644.4229 1114.4555 1640.9062 1107
C 1637.7439 1100.2959 1631.5529 1093.9519 1624.9707 1090.6719
L 1620.0527 1088.2207
L 1655.3222 1063.252
C 1688.9409 1039.4513 1690.8592 1038.247 1696.2754 1037.5703
C 1708.3199 1036.0654 1720.3148 1026.9897 1725.8105 1015.2188
C 1728.1293 1010.2525 1728.4735 1008.2511 1728.4375 1000
C 1728.4024 991.9115 1728.0069 989.65115 1725.7676 984.78128
C 1720.3721 973.04759 1708.3409 963.93696 1696.2461 962.42581
C 1690.7907 961.7442 1688.9472 960.58738 1655.25 936.72463
L 1619.9687 911.74026
L 1624.8984 909.4551
C 1631.3988 906.44344 1637.5808 900.1246 1640.8515 893.14846
C 1644.4126 885.55273 1644.6383 872.04469 1641.3242 864.82424
C 1636.2682 853.80869 1624.8769 845.78857 1612.3887 844.4512
C 1608.8744 844.07486 1606 843.4712 1606 843.1094
C 1606 842.38419 1618.7745 788.4897 1619.5703 785.85745
C 1619.8434 784.9541 1621.4476 783.64416 1623.1347 782.94534
C 1628.3214 780.79696 1635.8302 772.58039 1639.2851 765.27541
C 1642.1538 759.20966 1642.4941 757.55123 1642.4941 749.44729
C 1642.4988 740.98614 1642.254 739.89726 1638.7226 732.75198
C 1632.8663 720.90259 1623.6351 714.13053 1610.1972 711.82619
C 1604.4324 710.83764 1602.2712 710.90314 1596.9062 712.22073
L 1590.5 713.79299
L 1564.2656 697.73244
L 1538.0312 681.67385
L 1542.3691 677.03518
C 1548.5399 670.43811 1551.2778 662.64183 1550.8105 653.00002
C 1550.1607 639.59435 1543.3241 629.25285 1531.1601 623.27932
C 1526.2759 620.88079 1524.3354 620.50781 1517 620.55471
C 1511.4046 620.59047 1507.2186 621.17129 1504.75 622.25393
C 1502.6875 623.1585 1500.9963 623.58368 1500.9863 623.19924
C 1500.9785 622.81481 1504.1923 603.60002 1508.1289 580.50002
C 1514.8622 540.98834 1515.4567 538.28314 1518.164 534.8301
C 1523.9922 527.3966 1525.5 522.499 1525.5 511.00002
C 1525.5 501.40377 1525.2518 500.00878 1522.6094 494.79299
C 1515.0437 479.859 1498.1651 470.94158 1482.8535 473.78908
C 1476.4249 474.98459 1468.1185 478.61973 1463.7969 482.12697
C 1461.5339 483.96351 1454.2123 485.49999 1418.7969 491.57229
C 1395.5334 495.56103 1376.3755 498.70124 1376.2226 498.5508
C 1376.0698 498.40036 1376.446 496.97747 1377.0586 495.38869
C 1381.9437 482.71939 1378.6083 467.7041 1368.834 458.35549
C 1360.6422 450.52044 1350.6795 447.37807 1339.6289 449.14455
C 1332.6065 450.26709 1327.3084 452.82253 1321.9277 457.68361
C 1319.738 459.66192 1317.7743 461.10528 1317.5625 460.89065
C 1317.3506 460.67602 1310.1261 449.06506 1301.5097 435.08791
L 1285.8437 409.67385
L 1286.9219 405.39455
C 1288.6081 398.69823 1288.2319 388.61043 1286.0664 382.44924
C 1278.6033 361.21535 1254.3284 351.07677 1233.9238 360.66994
C 1226.8398 364.00047 1219.8863 370.34245 1216.8984 376.19924
C 1215.8318 378.28997 1214.8071 380.00002 1214.6211 380.00002
C 1214.4351 380.00002 1201.1684 383.15002 1185.1406 387.00002
C 1169.1127 390.85002 1155.8357 394.00002 1155.6347 394.00002
C 1155.4336 394.00002 1155.0462 390.96252 1154.7734 387.25002
C 1154.1374 378.59343 1151.0113 371.94192 1144.5078 365.40432
C 1137.3245 358.18329 1130.3356 355.66811 1119 356.22658
C 1112.3884 356.55231 1109.3831 357.21883 1105.4726 359.22658
C 1099.2035 362.44531 1093.2607 368.43913 1090 374.8301
L 1087.5 379.72854
L 1062.5 344.34572
C 1038.741 310.71772 1037.4629 308.6763 1036.7578 303.25588
C 1035.2008 291.28707 1026.8383 279.97057 1015.4785 274.46096
C 1010.1213 271.86263 1008.4594 271.55917 999.4824 271.53127
z

M 998.99998 346.41604
C 1009.9934 346.33533 1016.9807 343.69903 1024.5605 336.7715
C 1030.1377 331.67427 1034.2559 325.01169 1036.3945 317.62502
L 1037.5371 313.67775
L 1061.9336 348.08986
L 1086.3281 382.50002
L 1086.541 390.10158
C 1086.8199 400.07901 1090.3336 408.16741 1097.1621 414.55471
C 1104.7451 421.64771 1109.6767 423.49913 1121 423.50002
C 1129.9129 423.50072 1130.8883 423.2893 1136.7851 420.09182
C 1144.3532 415.98809 1148.4058 411.58815 1152.082 403.48049
L 1154.8398 397.39846
L 1183.1699 390.67775
C 1198.7516 386.98192 1211.725 383.96734 1212 383.97854
C 1212.275 383.9897 1212.5 388.61242 1212.5 394.25002
C 1212.5 403.64173 1212.7583 405.04441 1215.5937 411.00002
C 1219.5266 419.26103 1225.739 425.47333 1234 429.40627
C 1239.93 432.22946 1241.3769 432.49925 1250.5 432.49025
C 1259.3492 432.48134 1261.1412 432.16552 1266.0703 429.75197
C 1271.8025 426.94517 1277.6718 421.96879 1282.0215 416.22658
L 1284.5 412.95315
L 1300.1621 438.54885
L 1315.8242 464.1426
L 1313.664 468.82033
C 1311.9273 472.57963 1311.5058 475.36715 1311.5058 483.00002
C 1311.5094 491.42011 1311.8224 493.09242 1314.2539 497.71291
C 1318.2188 505.24744 1322.092 509.22954 1329.2148 513.09182
C 1335.1111 516.28905 1336.0878 516.50002 1345 516.50002
C 1353.5269 516.50002 1355.0926 516.19944 1360.2929 513.56447
C 1363.4795 511.94984 1367.8229 508.74564 1369.9433 506.44533
L 1373.7988 502.26369
L 1413.1484 495.53518
C 1434.7915 491.83413 1453.6827 488.57976 1455.1289 488.30276
L 1457.7597 487.79885
L 1454.8672 493.64846
C 1453.2766 496.86645 1451.495 502.24185 1450.9082 505.59377
C 1448.1581 521.30231 1456.8313 537.85295 1471.6308 545.13869
C 1483.1643 550.81663 1498.658 550.11322 1508.4492 543.46877
L 1512.2422 540.89455
L 1511.6894 543.19729
C 1511.3846 544.46358 1508.0989 563.50002 1504.3887 585.50002
C 1497.7921 624.61585 1497.5815 625.55203 1494.8183 627.82619
C 1491.0365 630.93863 1486.2643 638.00463 1484.4101 643.2383
C 1483.5798 645.58184 1482.9004 650.65002 1482.9004 654.50002
C 1482.9004 670.64064 1492.4369 682.99458 1508.414 687.5508
C 1515.3558 689.53043 1522.1733 689.02879 1530.4512 685.93166
L 1535.9433 683.87698
L 1561.4043 699.54885
L 1586.8652 715.21877
L 1582.3105 718.69729
C 1573.377 725.51638 1568.6577 733.22881 1566.957 743.78909
C 1565.7372 751.36329 1567.6786 762.06905 1571.4336 768.47659
C 1579.1997 781.72837 1596.2193 789.85088 1610.5 787.12112
C 1613.2496 786.59554 1615.6333 786.29929 1615.7969 786.46291
C 1616.2342 786.9002 1603.1162 842.25085 1602.1797 843.91995
C 1601.7417 844.70069 1599.7109 845.919 1597.666 846.62698
C 1589.0967 849.59373 1580.6591 858.15535 1577.3926 867.2012
C 1576.5388 869.56546 1575.8342 874.65002 1575.8242 878.50002
C 1575.7778 897.72625 1589.1819 911.45832 1609.4082 912.90432
L 1617.75 913.50002
L 1651.7558 937.50002
C 1670.4582 950.70002 1685.5615 961.83752 1685.3203 962.25002
C 1685.0791 962.66252 1683.8562 963.00002 1682.6015 963.00002
C 1678.5322 963.00002 1668.3772 968.89102 1663.5508 974.05081
C 1660.9714 976.80839 1657.6537 981.63635 1656.1797 984.78128
C 1653.8623 989.7256 1653.5 991.78554 1653.5 1000
C 1653.5 1008.2145 1653.8623 1010.2745 1656.1797 1015.2188
C 1657.6537 1018.3638 1660.9714 1023.1916 1663.5508 1025.9492
C 1668.3772 1031.109 1678.5322 1037 1682.6015 1037
C 1683.8562 1037 1685.0809 1037.3375 1685.3242 1037.75
C 1685.5675 1038.1625 1670.2925 1049.4281 1651.3789 1062.7852
L 1616.9902 1087.0703
L 1609.2441 1087.3242
C 1589.8396 1087.958 1575.7782 1102.3381 1575.8242 1121.5
C 1575.8335 1125.35 1576.5344 1130.4181 1577.3808 1132.7617
C 1580.7886 1142.197 1588.7663 1150.292 1597.7051 1153.3867
C 1599.7286 1154.0872 1601.7417 1155.2993 1602.1797 1156.0801
C 1603.1101 1157.7384 1616.2366 1213.1062 1615.7969 1213.5176
C 1615.6337 1213.6703 1612.9136 1213.386 1609.7519 1212.8848
C 1602.6048 1211.7519 1591.9922 1213.7476 1585.7812 1217.3926
C 1568.4341 1227.573 1561.6486 1249.784 1570.4883 1267.4492
C 1573.5091 1273.4859 1576.2068 1276.6448 1582.3476 1281.3321
L 1586.9414 1284.8379
L 1561.2812 1300.5664
C 1536.2492 1315.9086 1535.543 1316.2645 1532.5586 1315.0352
C 1527.765 1313.0607 1519.8175 1311 1516.9922 1311
C 1511.8113 1311 1502.3689 1314.1554 1497.4121 1317.543
C 1480.0572 1329.4039 1477.6834 1353.8402 1492.3652 1369.4903
L 1497.6328 1375.1055
L 1504.3847 1414.8028
C 1508.0978 1436.6361 1511.3846 1455.5365 1511.6894 1456.8028
L 1512.2422 1459.1055
L 1508.4492 1456.5293
C 1498.658 1449.8849 1483.1643 1449.1835 1471.6308 1454.8614
C 1456.8075 1462.1589 1448.0622 1478.933 1450.9179 1494.5938
C 1451.5102 1497.8419 1453.2686 1503.0875 1454.8262 1506.25
C 1456.3839 1509.4125 1457.4486 1512 1457.1914 1512
C 1456.9342 1512 1438.0581 1508.7933 1415.2441 1504.8731
L 1373.7637 1497.7442
L 1370.4004 1494.0215
C 1368.5504 1491.9737 1364.2151 1488.768 1360.7676 1486.8985
C 1354.9564 1483.7473 1353.8435 1483.5059 1345.5 1483.5059
C 1338.2729 1483.51 1335.5312 1483.9554 1331.5801 1485.7735
C 1324.081 1489.2241 1318.7212 1494.18 1314.9336 1501.166
C 1311.7068 1507.1176 1311.4993 1508.0732 1311.5 1517
C 1311.5006 1524.6259 1311.9288 1527.4238 1313.664 1531.1797
L 1315.8242 1535.8575
L 1300.1621 1561.4629
L 1284.5 1587.0684
L 1282.5 1584.2832
C 1278.4858 1578.6958 1272.0943 1573.1874 1266.3652 1570.377
C 1261.0358 1567.7627 1259.5413 1567.5 1250 1567.5
C 1240.5096 1567.5 1238.948 1567.7703 1233.7617 1570.3164
C 1226.1429 1574.0567 1219.3583 1581.028 1215.582 1588.9961
C 1212.763 1594.9445 1212.5 1596.3738 1212.5 1605.75
C 1212.5 1611.3876 1212.275 1616.0124 1212 1616.0274
C 1211.725 1616.0428 1198.6282 1613.0053 1182.8965 1609.2774
L 1154.2949 1602.5
L 1152.6211 1597.795
C 1149.1995 1588.1672 1139.7902 1579.6477 1129.5 1576.8614
C 1123.8187 1575.3231 1112.3882 1576.2825 1106.7832 1578.7676
C 1094.8039 1584.0788 1086.924 1596.1958 1086.541 1609.8985
L 1086.3281 1617.5
L 1061.9336 1651.9102
L 1037.5371 1686.3223
L 1036.3945 1682.375
C 1032.9729 1670.5572 1023.7487 1660.0053 1013.2461 1655.8907
C 1008.915 1654.1939 1005.4028 1653.6323 998.98826 1653.6133
C 991.51405 1653.5911 989.66383 1653.9696 983.78905 1656.7188
C 976.2532 1660.2452 969.23052 1666.6934 965.89256 1673.1543
C 964.65785 1675.5441 963.16317 1679.6067 962.5703 1682.1817
L 961.49217 1686.8633
L 936.99608 1652.3028
L 912.49998 1617.7422
L 911.90428 1609.1211
C 911.1827 1598.686 908.52999 1592.4676 902.03123 1585.9688
C 894.73886 1578.6765 889.29446 1576.5337 877.99998 1576.5157
C 869.62552 1576.502 867.83248 1576.8274 862.85936 1579.2696
C 854.55538 1583.3476 847.36305 1591.9578 844.68358 1601.0293
C 844.35809 1602.1313 836.30526 1604.4392 815.86522 1609.2891
C 800.26388 1612.9909 787.01374 1616.0198 786.41991 1616.0098
C 785.65648 1616.0028 785.63364 1614.3814 786.34178 1610.4746
C 789.18504 1594.7882 779.64437 1577.4097 764.21873 1570.1797
C 759.20903 1567.8317 757.25809 1567.5 748.4785 1567.5
C 739.19363 1567.5 737.97205 1567.7388 731.85545 1570.75
C 725.70764 1573.7766 719.67887 1579.137 715.94725 1584.8946
C 714.41912 1587.2524 714.15329 1586.8925 698.60155 1561.584
L 682.80467 1535.8789
L 684.91405 1530.9785
C 692.16771 1514.1169 684.80837 1494.4561 668.18944 1486.295
C 663.23625 1483.8626 661.33443 1483.5059 653.49998 1483.5059
C 642.55859 1483.5121 637.53006 1485.4933 629.71678 1492.8828
L 624.43358 1497.8789
L 583.08397 1504.9727
C 560.34143 1508.8745 541.59538 1511.9294 541.42577 1511.7598
C 541.25615 1511.5902 542.5534 1508.5529 544.30858 1505.0117
C 547.25727 1499.0625 547.49999 1497.8111 547.49999 1488.5371
C 547.49999 1479.4553 547.22042 1477.9292 544.56053 1472.5117
C 540.81622 1464.8856 534.11249 1458.1838 526.48631 1454.4395
C 521.06881 1451.7796 519.54467 1451.5 510.46288 1451.5
C 501.18883 1451.5 499.93745 1451.7427 493.98827 1454.6914
C 490.44707 1456.4466 487.40997 1457.744 487.24022 1457.5742
C 487.07046 1457.4045 490.12529 1438.6432 494.02928 1415.8828
L 501.12889 1374.5
L 505.70702 1370
C 508.22585 1367.525 511.46111 1363.025 512.89452 1360
C 515.10421 1355.3368 515.49813 1353.1307 515.49413 1345.5
C 515.48807 1334.7206 513.53753 1329.6273 506.55467 1322.1621
C 497.05932 1312.0108 482.05267 1308.7382 468.73631 1313.9141
L 462.97264 1316.1543
L 439.23631 1301.6328
C 408.77649 1282.998 410.89152 1284.6248 414.61131 1282.7012
C 419.11921 1280.3701 425.85051 1272.5526 428.83983 1266.1758
C 431.16474 1261.2164 431.50016 1259.2389 431.49999 1250.5
C 431.49981 1241.6036 431.1942 1239.8783 428.73631 1234.875
C 424.69511 1226.6487 418.87097 1220.552 411.69725 1217.0371
C 403.38537 1212.9647 395.6029 1211.6029 388.33006 1212.9473
C 385.21194 1213.5238 382.58964 1213.8842 382.50194 1213.7481
C 382.41422 1213.6121 385.48735 1200.4063 389.33202 1184.4024
L 396.32225 1155.3047
L 402.6035 1152.5684
C 409.89415 1149.3922 416.98394 1142.447 420.31639 1135.2168
C 423.63055 1128.0264 423.43353 1114.4779 419.90624 1107
C 416.63695 1100.069 410.42251 1093.8436 403.29295 1090.3555
C 398.94471 1088.2281 396.03602 1087.5851 389.7246 1087.3594
L 381.69139 1087.0723
L 347.36522 1062.8184
C 328.48511 1049.4782 313.36726 1038.2863 313.76952 1037.9492
C 314.17177 1037.6122 316.52499 1036.7719 318.99999 1036.0801
C 336.51042 1031.185 348.54813 1011.6294 345.0371 993.78323
C 342.1357 979.03565 332.74478 968.17953 319.2871 964.01565
C 316.32 963.09761 314.01724 961.93175 314.16991 961.42385
C 314.32259 960.91595 329.58729 949.79056 348.09178 936.7012
L 381.73631 912.90237
L 389.61913 912.66995
C 403.17595 912.27146 414.23384 905.13477 419.8496 893.15627
C 423.42419 885.53162 423.64121 872.05062 420.30663 864.78323
C 416.99333 857.56224 409.90043 850.60945 402.60155 847.42971
L 396.3203 844.69338
L 389.64061 816.59768
C 385.96694 801.14432 382.96955 787.88895 382.98045 787.1426
C 382.9913 786.39626 383.61835 786.02292 384.37303 786.31252
C 388.16395 787.76723 395.36069 788.06885 400.63085 786.99416
C 413.15155 784.44095 423.47881 776.40388 428.89061 765.00002
C 431.16337 760.21082 431.49999 758.20766 431.49999 749.50002
C 431.49999 740.78504 431.16177 738.77871 428.86522 733.88088
C 425.84714 727.44422 420.40802 721.0332 415.26952 717.85744
C 410.95103 715.18846 408.42675 717.2374 439.2871 698.34768
L 463.07616 683.78713
L 468.28709 686.08987
C 472.29616 687.86236 475.34639 688.39838 481.49999 688.41018
C 491.79473 688.42993 499.8109 685.04755 506.55467 677.83791
C 513.54104 670.36891 515.49022 665.27933 515.49022 654.50002
C 515.49022 643.56395 513.50847 638.5332 506.13084 630.73244
L 501.15038 625.46682
L 494.041 584.10158
C 490.13072 561.35037 487.07046 542.59555 487.24022 542.4258
C 487.40997 542.25605 490.44707 543.55344 493.98827 545.30862
C 499.93745 548.25731 501.18883 548.50002 510.46288 548.50002
C 519.54467 548.50002 521.06881 548.22046 526.48631 545.56057
C 534.11249 541.81626 540.81622 535.11253 544.56053 527.48635
C 547.22042 522.06885 547.49999 520.5447 547.49999 511.46291
C 547.49999 502.18886 547.25727 500.93748 544.30858 494.9883
C 542.5534 491.4471 541.2506 488.41738 541.41209 488.25588
C 541.57359 488.09439 560.3226 491.15058 583.07811 495.04885
L 624.45116 502.13674
L 629.72459 507.12502
C 637.52892 514.50603 642.56139 516.48816 653.49998 516.49416
C 661.33443 516.49856 663.23625 516.13747 668.18944 513.7051
C 684.81506 505.54075 692.16831 485.88442 684.90819 469.00783
L 682.79295 464.08986
L 698.59178 438.3965
C 714.15564 413.08636 714.41431 412.73945 715.9453 415.10158
C 719.67916 420.86245 725.70646 426.22288 731.85545 429.25002
C 737.97205 432.26121 739.19363 432.50002 748.4785 432.50002
C 757.25809 432.50002 759.20903 432.16838 764.21873 429.82033
C 779.64437 422.59034 789.18504 405.21179 786.34178 389.52541
C 785.47216 384.72766 785.54821 384.0067 786.91991 384.0508
C 787.78874 384.07875 801.03807 387.11837 816.36327 390.80666
L 844.2285 397.51369
L 846.16405 402.7051
C 848.76705 409.68303 855.7527 417.24008 862.79686 420.69924
C 867.82764 423.16969 869.61918 423.50002 877.99998 423.50002
C 886.92384 423.50002 887.8838 423.29216 893.82616 420.07033
C 905.35773 413.81814 910.93782 404.82299 911.90428 390.92971
L 912.49998 382.36135
L 936.99803 347.75588
L 961.49608 313.15041
L 962.57225 317.82619
C 965.12628 328.91901 972.78389 338.11422 983.79881 343.31447
C 989.73918 346.11898 991.46448 346.47134 998.99998 346.41604
z
"
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
  </motion.svg>
)
export default Modify
