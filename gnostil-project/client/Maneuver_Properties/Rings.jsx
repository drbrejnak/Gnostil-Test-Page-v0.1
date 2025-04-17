import * as React from "react"
import {motion} from "framer-motion"

const Rings = (props) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" preserveAspectRatio="xMinYMax meet" {...props}
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
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={7.5}
        d="
M1053 1992.9051C1796.91 1955.8747 2237.0708 1130.5774 1854.684 489.7551 1470.8108-153.558 530.3513-155.2082 145.7708 486.7566-263.8736 1170.5595 255.3823 2032.6089 1053 1992.9051Z
M1033.5 1894.0259C1756.3308 1863.4641 2149.1321 1036.61 1714.6132 460.2699 1306.809-80.6362 462.2311 13.4448 182.6406 630.9225-90.7049 1234.608 372.3274 1921.9808 1033.5 1894.0259Z
M1036.5 1804.1043C1671.7507 1771.5039 2023.579 1055.393 1659.1657 536.7316 1333.9673 73.884 639.8031 82.8655 327.6908 553.959-19.1877 1077.5277 337.0307 1773.735 967.5 1804.4274 982.5775 1805.1614 1019.2473 1804.9897 1036.5 1804.1043Z
M1039.5 1723.1131C1598.3547 1690.0592 1911.7664 1067.1544 1604.4886 600.1999 1320.0728 167.9875 680.1325 167.7232 394.4884 599.7002 84.7846 1068.0624 402.1303 1693.1577 965 1723.4719 979.1371 1724.2333 1024.2326 1724.0161 1039.5 1723.1131Z
M1046.5 1584.218C1544.822 1540.7283 1766.8034 938.1011 1414.5 585.185 1109.5057 279.6602 586.6036 399.3201 444.7688 807.0965 306.22 1205.4257 627.8147 1620.7576 1046.5 1584.218Z
"
        className="dcg-svg-curve"
        paintOrder="fill stroke markers"
      />
    </motion.g>
  </motion.svg>
)
export default Rings
