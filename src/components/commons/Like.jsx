import React from 'react'

const Like = (props)=>{
    let classes = 'fa fa-heart';
        if(!props.liked)
           classes+="-o";
   return (
            <div onClick={props.onClick} style={{cursor: "pointer"}}>
                <i className={classes} aria-hidden="true"></i>

            </div>
        )
}

export default Like;
