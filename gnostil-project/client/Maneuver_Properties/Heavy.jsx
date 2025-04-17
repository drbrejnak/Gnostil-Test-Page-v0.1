import * as React from "react"
import {motion} from "framer-motion"

const Heavy = (props) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 2000 2000"} preserveAspectRatio="xMinYMax meet" {...props}>
    <motion.g>
      <title>{"Expression 1"}</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
        duration: 4.90,
        ease: "linear",
        repeat: 0,
        }}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={5}
        d="M999.4531 256.1738c-10.366-.0122-20.6956 3.8598-48.4531 11.5957l-46.5 12.9609-49.0371-.4961-49.0371-.4941-36.9629 21.7637c-53.2127 31.3327-44.6276 27.712-97.4629 41.0859l-45.5 11.5176L591 389.9531l-35.5 35.8457-34.5 19.248c-53.9647 30.1064-46.7282 22.8199-77.9121 78.4531l-19.0586 34-35.5117 35-35.5117 35L340.7852 675l-12.2188 47.5-24.9395 41.9492-24.9395 41.9492.5938 48.9512.5957 48.9512-13.3477 47.8496L253.1836 1000l13.3457 47.8496 13.3477 47.8496-.5957 48.9512-.5938 48.9512 24.9512 41.9707 24.9531 41.9707 12.1953 47.4785L352.9824 1372.5l35.5137 35 35.5137 35 16.6016 29.5c9.1312 16.225 20.1393 35.3914 24.4629 42.5938l7.8613 13.0957 35.7832 20.3261c19.6801 11.179 38.7704 22.0405 42.4238 24.1367 5.3913 3.0933 13.0807 10.3871 40.8203 38.7227l34.1777 34.9121 18.6797 4.666c82.0409 20.4988 69.3357 15.2864 141.959 58.2578l19.2813 11.4082 50.7188-.1523 50.7207-.1504 41 11.5234c22.55 6.3381 42.575 11.9642 44.5 12.502M999.4531 256.1738C1009.8192 256.186 1020.2223 260.083 1048.127 267.8847L1094.7539 280.9218 1143.709 280.3007 1192.6641 279.6816 1234.582 304.5839 1276.5 329.4882 1318 340.1991C1340.825 346.0897 1362.3008 351.6511 1365.7246 352.5585L1371.9492 354.2089 1406.8262 389.4804 1441.7031 424.7519 1477.1016 444.5488C1526.3505 472.0915 1526.948 472.5467 1536.7363 489.9843 1539.356 494.6511 1549.15 512.0218 1558.5 528.5859L1575.5 558.7031 1605.8633 588.2793C1648.8444 630.1454 1644.2808 622.2942 1659.002 679.7109L1669.8262 721.9238 1695.0293 764.6289 1720.2324 807.332 1719.9414 857.916 1719.6504 908.5 1732.3242 953.4543C1747.4576 1007.126 1747.4934 992.713 1732.0977 1048.091L1719.1953 1094.5012 1719.7344 1143.5344 1720.2754 1192.5676 1695.0352 1235.3801 1669.7969 1278.1926 1658.957 1320.5364C1644.3912 1377.4338 1648.8753 1369.7816 1605 1412.5989L1575.5 1441.3879 1558.5 1471.4582C1549.15 1487.9977 1539.356 1505.35 1536.7363 1510.0168 1526.951 1527.449 1526.3372 1527.9177 1477.2109 1555.3918L1441.9199 1575.1282 1406.7109 1610.6301 1371.5 1646.1321 1324.8164 1657.9895 1278.1348 1669.8469 1235.3594 1695.0832 1192.584 1720.3215 1143.6816 1719.6887 1094.7812 1719.0578 1079.1406 1723.4543C1070.5384 1725.8717 1049.4363 1731.7082 1032.248 1736.425 1000.0094 1745.2721 998.8797 1745.4858 993 1743.843
        "
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
    <motion.g>
      <title>{"Expression 2"}</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
        duration: 4.90,
        ease: "linear",
        repeat: 0,
        }}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={5}
        d="M999.058 209.748l53.248-6.6602 53.25-6.6602 49.4707 20.1973L1204.5 236.8203l52.4727 7.1699c28.8602 3.9425 52.9352 7.4456 53.5 7.7852.5649.3396 12.9523 9.6782 27.5273 20.7519 14.575 11.0738 33.475 25.3439 42 31.7129l15.5 11.5801 49 20.7324 49 20.7305L1522 394.25c34.7847 45.1168 37.2625 47.6682 73.5 75.6914 15.95 12.3345 33.0961 25.6057 38.1035 29.4922l9.1055 7.0664 18.8144 44.5c10.3477 24.475 19.7034 46.5139 20.7911 48.9746 1.0877 2.4607 16.358 23.5798 33.9335 46.9316 17.5754 23.3518 32.1151 42.9379 32.3106 43.5254.1955.5875 3.5621 24.4684 7.4824 53.0684l7.127 52 20.0644 49 20.0645 49-6.584 53.25-6.584 53.25 6.5938 53.25 6.5957 53.25-20.0664 49-20.0665 49-7.1367 52c-3.9248 28.6-7.3018 52.4979-7.5058 53.1074-.204.6096-14.7421 20.1933-32.3067 43.5176-17.5646 23.3244-32.8279 44.4246-33.9179 46.8906-1.0901 2.466-10.4532 24.5238-20.8067 49.0156l-18.8242 44.5313-38.0937 29.4668c-46.3952 35.8898-46.8679 36.3647-82.5938 82.7266l-28.5 36.9843-41 17.2598c-61.531 25.9028-54.6281 21.908-107.8848 62.4316-18.2136 13.859-33.5878 25.4766-34.166 25.8184s-24.6532 3.8512-53.5 7.7969l-52.4492 7.1738-42.5 17.3203c-23.375 9.5265-45.65 18.6149-49.5 20.1953l-7 2.8731-53-6.6446-53-6.6464M999.0586 209.7481 946.1914 203.0625 893.3242 196.375 844.9121 216.291 796.5 236.207 751.0801 242.5586C726.0996 246.0528 702.5734 249.216 698.7988 249.5879 690.546 250.4011 689.3904 251.152 645 284.5 599.9597 318.3362 606.7609 314.5016 548.084 339.1289 524.7552 348.9202 505.3485 357.2856 504.957 357.7168 504.5655 358.148 491.5152 374.925 475.957 395 440.6154 440.6019 438.303 442.9078 391.9941 478.7305L355.5 506.961 351.084 517.7305C341.9551 539.993 317.6658 596.7114 314.9961 602 313.4691 605.025 298.2003 626.0863 281.0665 648.8027L249.9141 690.1054 243.9707 733.8027C235.0729 799.2166 237.266 791.0664 211.6875 853.7617L195.2617 894.0234 201.8672 947.0117 208.4727 1000 201.8613 1053.0293 195.2519 1106.0566 211.6875 1146.2793C237.2376 1208.8041 235.0723 1200.7629 243.957 1266.1816L249.8906 1309.8633 281.0547 1351.1816C298.1952 1373.9068 313.4691 1394.975 314.9961 1398 317.6802 1403.3172 342.0779 1460.2951 351.084 1482.2793L355.5 1493.0605 391.9941 1521.2789C438.3031 1557.0888 440.6071 1559.3871 475.957 1604.9996 491.5152 1625.0746 504.5655 1641.8516 504.957 1642.2828S524.7552 1651.0794 548.084 1660.8707C607.4674 1685.7945 600.352 1681.6503 655.1719 1723.2379L688.8438 1748.7808 741.6719 1756.0523 794.5 1763.3258 842 1782.7808C898.8518 1806.0667 886.9474 1804.5178 949 1796.6891L999.5 1790.318
"
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
    <motion.g>
      <title>{"Expression 3"}</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
        duration: 0,
        ease: "linear",
        repeat: 0,
        }}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={5}
        d="M1000.5 1746.5l.2715 20.9297.2695 20.9277-.9863.9883-.9883.9883-.5547-1.4434c-.3048-.7943-.4323-10.5464-.2832-21.6699l.2715-20.2227 1-.25 1-.248ZM804.2832 1721h1.3574c2.0503 0 1.7144 1.916-3.9316 22.4238-4.5625 16.5725-7.6581 23.7436-7.7324 17.9102-.011-1.0083 2.3001-10.4965 5.1406-21.084l5.166-19.25ZM1193 1720.5996l.9121.9512c.8883.9255 11.0879 37.9908 11.0879 40.293 0 2.3626-2.9859 1.0568-3.6445-1.5938-.3758-1.5125-2.8042-10.625-5.3965-20.25-2.754-10.2252-4.3488-17.8941-3.836-18.4492l.877-.9512Zm180.6855-74.6836 1.0157 1.291c2.0708 2.6362 20.2988 34.7342 20.2988 35.7442 0 1.4336-1.5415 1.3205-2.7344-.2012-.539-.6875-5.3614-8.837-10.7148-18.1094l-9.7324-16.8594.9336-.9316.9335-.9336ZM624.875 1645.5l1.0195 1.0059 1.0195 1.0078-10.3574 17.959c-9.8226 17.0343-11.7435 19.7017-12.8457 17.83-.372-.632 7.8993-15.4413 20.2754-36.3027l.8887-1.5ZM1528.293 1527c1.9634 0 31.0122 29.6996 30.2519 30.9297-1.1553 1.8692-1.7812 1.359-16.8066-13.6914-13.9111-13.9344-16.4887-17.2383-13.4453-17.2383Zm-1058.3301-.4375 1.2383 1.2383 1.2363 1.2363-14.9551 14.9824C443.4395 1558.086 440 1560.7842 440 1557.7383c0-.6944 6.7427-7.9928 14.9824-16.2188l14.9805-14.957Zm-118.1621-153.707c.4935.0115.6887.2852.8438.7011.2168.5813-6.9271 5.2639-15.875 10.4063-8.9479 5.1425-17.2057 9.9565-18.3496 10.6973-1.1439.7407-2.3814 1.0443-2.75.6757-1.4713-1.4713-.0327-2.5206 16.6875-12.1972 13.8004-7.986 17.9629-10.3177 19.4434-10.2832Zm1295.3574-.1055c.9744-.3703 36.8418 20.3975 36.8418 21.332 0 2.2645-3.044.9227-19.5371-8.6172-16.0103-9.2606-19.55-11.8617-17.3047-12.7148Zm73.9785-180.25c.8092-.3106 10.4477 1.8392 21.418 4.7773l19.9453 5.3438v1.3555c0 2.2436-1.238 2.041-21.3809-3.5039-10.6598-2.9344-19.8482-5.8014-20.4179-6.3711l-1.0352-1.0352 1.4707-.5664Zm-1444.166-.5c1.742 0 1.1383 2.8328-.7207 3.3828-.9625.285-9.625 2.589-19.25 5.1211-9.625 2.532-18.0469 4.7847-18.7168 5.0059-.6699.2212-1.5086-.0674-1.8633-.6407-1.0997-1.7794 33.8443-12.8691 40.5508-12.8691ZM1768.5 998.2539l20 .2461v1.5 1.5l-20.6777.2695-20.6797.2715-.6992-1.1328c-1.4765-2.389 2.7089-2.8925 22.0566-2.6543Zm-1537 0 20 .2461v1.5 1.5l-20.6777.2695-20.6797.2715-.6992-1.1328c-1.4765-2.389 2.7088-2.8925 22.0566-2.6543Zm5-203.7539 2 .3262c1.7712.2891 33.2599 8.4548 37.75 9.7891.9625.2861 1.75 1.1632 1.75 1.9512 0 2.0803-1.5389 1.813-22.5-3.918l-19-5.1953v-1.4766V794.5Zm1525-.3652.9512.9316.9492.9336-.9492.8789c-2.4225 2.242-41.0201 11.6264-41.9082 10.1894-.9109-1.4737.4517-1.9605 21.2734-7.6016l19.6836-5.332ZM315.4102 605.1465c.3754-.6075 8.0613 3.2409 18.7715 9.4023 20.3494 11.7068 19.5248 11.1452 18.2422 12.4277l-.9453.9453-17.4883-10.082c-19.3743-11.1672-19.4797-11.2378-18.5801-12.6934Zm1367.4882-.2988c.4443.0354.603.3271.7578.7441.2232.601-6.9205 5.2966-15.875 10.4336-8.9546 5.137-17.2174 9.9337-18.3613 10.6602-1.1439.7264-2.3814 1.019-2.75.6504-1.4667-1.4668-.0398-2.5012 16.8867-12.2559 14.103-8.1274 18.009-10.3385 19.3418-10.2324ZM441.2637 441c2.0043 0 31.0793 29.6353 30.3047 30.8887-1.183 1.9141-1.7497 1.4553-16.8301-13.6504C440.8657 444.3425 438.2536 441 441.2637 441Zm1115.6992-.4375 1.2051 1.2051 1.205 1.2051-14.8925 15.0137C1530.5385 472.0405 1527 474.8248 1527 471.7383c0-.6944 6.7427-7.9928 14.9824-16.2188l14.9805-14.957ZM1395.75 316.2402c2.4497-.7993 1.1218 2.102-8.8398 19.3164-10.2925 17.7862-11.3107 19.2236-12.3868 17.4824-.7439-1.2035 19.4552-36.2208 21.2266-36.7988Zm-790.9414-.0098c.8793-.2933 20.7135 32.8497 21.3945 35.75 1.242 5.2896-3.3151-.6679-12.0254-15.7227-10.395-17.9664-11.0905-19.4535-9.3691-20.0273ZM795.25 237.2422C797.9655 238.1293 808.1354 279 805.6406 279h-1.3574l-5.166-19.25c-5.4052-20.147-5.926-23.1803-3.8672-22.5078Zm408.2148-.1797c.8144-.2282 1.5203.2733 1.459 1.6875-.3769 8.6994-11.6038 42.3424-13.1992 39.5527-.2523-.4415 1.6573-8.6777 4.2442-18.3027 2.5868-9.625 5.0109-18.7375 5.3867-20.25.3731-1.5016 1.295-2.4593 2.1093-2.6875ZM1000.5 210.5l.2715 20.9297.2695 20.9277-.9863.9883-.9883.9883-.5547-1.4434c-.3048-.7943-.4323-10.5465-.2832-21.6699l.2715-20.2226 1-.25 1-.2481Z
        "
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
  </motion.svg>
)
export default Heavy
