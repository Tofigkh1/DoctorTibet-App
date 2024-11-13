import React from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"


function AboutUs(){
  let { isMobile } = useResize();
return (


    <div>

{!isMobile &&
}
    </div>
  
   
)
}

export default AboutUs