import * as React from "react"
import {motion} from "framer-motion"

const Honorable = (props) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 2000 2000"} preserveAspectRatio="xMinYMax meet" {...props}
  style={{
    width: "100%", // Scale to fit the container width
    height: "100%", // Scale to fit the container height
    margin: 0, // Remove any default margins
    padding: 0, // Remove any default padding
    ...props.style, // Allow additional styles to be passed via props
  }}>
    <motion.g>
      <title>{"Expression 1"}</title>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
        duration: 4.9,
        ease: "linear",
        repeat: 0,
        }}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={5}
        d="M999.25 100.3144C968.7944 189.8068 858.7805 227.4333 784.1621 177.5664 777.4055 173.051 777.731 172.9856 774.5391 179.5098 734.8815 260.5668 622.1186 283.3664 554.6894 223.9609 548.4355 218.4512 547.7191 219.3823 549.6523 230.5059 564.1705 314.0405 498.8541 392.1706 412.3809 394.707L394.2598 395.2383 393.6992 413.3691C391.0188 499.8812 312.9503 565.1548 229.5059 550.6523 217.8892 548.6334 217.5806 549.2113 225.1602 558.8008 281.3167 629.8493 258.8548 734.6886 178.8203 775.0898 171.89 778.5883 171.9375 778.2941 177.0781 786.2168 225.5976 860.9948 188.3745 969.2897 104.7578 996.6231 97.2637 999.0728 97.2637 1000.9272 104.7578 1003.377 188.3849 1030.7137 225.6036 1138.9959 177.0781 1213.7832 171.9375 1221.7059 171.89 1221.4118 178.8203 1224.9102 258.8548 1265.3114 281.3167 1370.1507 225.1602 1441.1992 217.5806 1450.7887 217.8892 1451.3667 229.5059 1449.3477 312.9643 1434.8428 391.0184 1500.1043 393.6992 1586.6309L394.2598 1604.7617 412.3809 1605.293C498.8541 1607.8295 564.1705 1685.9594 549.6523 1769.4941 547.7191 1780.6176 548.4355 1781.5489 554.6894 1776.0391 622.116 1716.6359 734.883 1739.4362 774.5391 1820.4902 777.731 1827.0143 777.4055 1826.949 784.1621 1822.4336 860.3686 1771.5054 968.7656 1810.0511 997.3691 1898.25M999.25 100.3144C1036.3077 195.914 1137.719 228.2307 1212.9355 182.5391 1220.232 178.1067 1219.153 177.7189 1224.0176 186.5313 1266.8706 264.1618 1371.4732 284.8825 1442.2422 229.7598L1445.9824 226.8457 1445.2422 231.6738C1432.1496 316.9128 1500.4029 397.3795 1586.6113 398.3418L1600.7207 398.5 1601.3027 414C1604.4812 498.5405 1677.3044 563.4604 1759.5996 555.1172 1773.7667 553.6809 1773.2676 553.1852 1766.5938 562.0566 1714.5998 631.1712 1740.4991 741.3735 1817.25 777.5996 1821.8401 779.766 1821.8388 779.6497 1817.3418 786.6797 1778.7682 846.9799 1794.584 932.8107 1852.4922 977.4414 1864.5325 986.7211 1886.3902 999 1890.8672 999 1891.491 999 1892 999.45 1892 1000 1892 1000.55 1891.4375 1001.0037 1890.75 1001.0137 1888.2577 1001.0424 1869.0201 1010.9158 1860.3652 1016.6074 1797.0231 1058.2624 1776.9278 1150.1431 1817.3418 1213.3203 1821.8384 1220.3503 1821.8397 1220.2341 1817.25 1222.4004 1740.4991 1258.6266 1714.5999 1368.8307 1766.5938 1437.9453 1773.2743 1446.8255 1773.8492 1446.2903 1759.1465 1444.8516 1677.2593 1436.8384 1604.4356 1501.7305 1601.3066 1585.5L1600.709 1601.5 1586.6055 1601.6582C1500.3882 1602.621 1432.1479 1683.0775 1445.2422 1768.3281L1445.9824 1773.1543 1442.2422 1770.2402C1371.4732 1715.1175 1266.8706 1735.8383 1224.0176 1813.4688 1219.153 1822.2811 1220.232 1821.8933 1212.9355 1817.4609 1137.8218 1771.8317 1036.8655 1803.8598 997.3691 1898.25
"
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
  </motion.svg>
)
export default Honorable
