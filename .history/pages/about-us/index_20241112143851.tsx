import React from "react"
import ThemeToggler from "../../@/components/my-components/theme/theme-toggler"
import { useResize } from "../../Shared/Hooks/useResize";


function AboutUs(){
  let { isMobile } = useResize();
return (


    <div>

{!isMobile &&
<div>
  
</div>
}




    </div>
  
   
)
}

export default AboutUs