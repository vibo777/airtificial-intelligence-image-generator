import React, { useRef,useState } from "react";
import Robot_img from '../Assets/AI_Robot.jpg';

const ImageGenerator=() => {

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    
    const ImageGenerator = async() =>{
        if(inputRef.current.value === ""){
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:'${inputRef.current.value}',
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        console.log(data);
    }

    return(     
    <div className="parent">
        <section class="main-layout d-flex justify-content-center align-items-center bg-img">
            <div class="container">
                {/* title  */}
                <h1 class="text-center text-light">AI Image <span class="text-primary">Generator</span></h1>

                {/* main image area */}
                <div class="d-flex justify-content-center align-items-center hero-img">
                    <img class="generative-img" src={image_url==="/"?Robot_img:image_url} height="250px" width="250px" alt="Generative Image" />
                </div>

                {/* search bar  */}
                <div class="input-group d-flex justify-content-center">
                    <div class="form-outline" data-mdb-input-init>
                    <input id="search-focus" ref={inputRef} type="search" placeholder="Describe What You Want To See" class="form-control transparent-input" />
                    </div>
                    <button type="button" onClick={()=>{ImageGenerator()}} class="btn btn-primary" data-mdb-ripple-init>
                        Generate
                    </button>
                </div>
            </div>
        </section>
    </div>
    )
}
export default ImageGenerator;