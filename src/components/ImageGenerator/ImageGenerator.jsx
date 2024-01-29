import React, { useRef,useState } from "react";
import Robot_img from '../Assets/AI_Robot.jpg';
 

const ImageGenerator=() => {

    // useState to store input value
    const [inputValue, setInputValue] = useState('');

    // Handle input change & update state
    const handleInputChange = (event) =>{
        setInputValue(event.target.value);
    };

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);
    
    const ImageGenerator = async() =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
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
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

    return(     
    <div classNameName="parent">
        <section className="main-layout d-flex justify-content-center align-items-center bg-img">
            <div className="container">
                {/* title  */}
                <h1 className="text-center text-light">AI Image <span className="text-primary">Generator</span></h1>
                <p className="text-white">Input Value :  {inputValue}</p>

                {/* main image area */}
                <div className="d-flex justify-content-center align-items-center hero-img">
                    <img className="generative-img" src={image_url==="/"?Robot_img:image_url} height="250px" width="250px" alt="Generative Image" />
                </div>

                {/*  loading frame */}
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}>
                        <div className={loading?"loading-text":"display-none"}>Loading...</div>
                    </div>
                </div>


                {/* Input Bar  */}
                <div className="input-group d-flex justify-content-center">
                    <div className="form-outline" data-mdb-input-init>
                    <input id="search-focus" ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} placeholder="Describe What You Want To See" className="form-control transparent-input" />
                    </div>
                    <button type="button" onClick={()=>{ImageGenerator()}} className="btn btn-primary" data-mdb-ripple-init>
                        Generate
                    </button>
                </div>
            </div>
        </section>
    </div>
    )
}
export default ImageGenerator;