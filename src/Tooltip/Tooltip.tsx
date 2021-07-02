import React, { ReactNode } from "react";
import "./tooltip.css";

type Placement = 'top'|'left'|'right'|'bottom'

export const position = (placement:Placement) => ({
    current: placement,
    opposite() {
      if (this.current === "left"){
        return "right";  
      } else if(this.current === "right"){
        return "left";
      } else if (this.current === "top") {
        return "bottom"
      }else if (this.current === "bottom"){
        return "top"
      } else {
         return this.current 
      }
    },
    isHorizontal() {
      return this.current === "left" || this.current === "right";
    },
    isVertical() {
      return this.current === "top" || this.current === "bottom";
    },
  });

const point = () => ({
    x: 0,
    y: 0,
    reset(p:any){
        this.x=p.x
        this.y=p.y
    },
    restrictRect(rect:any) {
        if (this.x < rect.l) this.x = rect.l;
        else if (this.x > rect.r) this.x = rect.r;

        if (this.y < rect.t) this.y = rect.t;
        else if (this.y > rect.b) this.y = rect.y;
    },
});

const getArrowPoint = (placement:Placement, content:any, arrow:any) => {
    switch (placement) {
      case "left":
        arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
        arrow.style.left = content.offsetWidth + "px";
        break;
      case "right":
        arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
        arrow.style.right = content.offsetWidth + "px";
        break;
      case "bottom":
        arrow.style.bottom = content.offsetHeight + "px";
        arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
        break;
      default:
        arrow.style.top = content.offsetHeight + "px";
        arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
        break;
    }
    arrow.className = "";
    arrow.classList.add(`simple-arrow-${placement}`);
  };
  


const getPoints=(el:any, tt:any, placement:Placement, space:Number)=>{
    const arrow = document.getElementById(`simple-arrow`);
    let recurCounter = 0;
    const pt = point();
  
    const bdys = {
      l: space,
      t: space,
      r: document.body.clientWidth - (tt.clientWidth + space),
      b: window.innerHeight - (tt.clientHeight + space),
    };

    const elRect = el.getBoundingClientRect();

    return (function recursive(placement:Placement){
        recurCounter++;
        const pos = position(placement);

        switch (pos.current) {
            case "left":
              pt.x = elRect.left - (tt.offsetWidth + space);
              pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
              break;
            case "right":
              pt.x = elRect.right + space;
              pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
              break;
            case "top":
              pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
              pt.y = elRect.top - (tt.offsetHeight + space);
              break;
            default:
              pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
              pt.y = elRect.bottom + space;
          }

          if (recurCounter < 2){
              
            if (
                (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
                (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
              ) {
                pt.reset(recursive(pos.opposite()));
                getArrowPoint(pos.opposite(), tt, arrow);
              } else {
                getArrowPoint(pos.current, tt, arrow);
              }

          }

          pt.restrictRect(bdys);

          return pt;
    })(placement);

}


interface Props {
  text:string,
  placement?:Placement,
  space?:Number,
  children:ReactNode,
  disabled?:boolean,
}
export const Tooltip = ({
  text,
  placement = "top",
  space = 10,
  children,
  disabled=false,
}:Props) => {
  const handleMOver = (e:any) => {
    const content = document.getElementById(`simple-tooltip`) as HTMLInputElement;
    content.removeAttribute('class');
    content.innerHTML = `${text} <span id='simple-arrow' class='simple-arrow-${placement}'></span>`;
    content.classList.add("simple-tooltip");

    const { x, y } = getPoints(e.currentTarget, content, placement, space);
    content.style.left = x + "px";
    content.style.top = y + "px";
    content.style.visibility = "visible";
  };
  
  const handleMOut = () => {
    let content = document.getElementById(`simple-tooltip`) as HTMLInputElement;
    content.style.visibility = "hidden";
  };

  if (disabled) return <span>{children}</span>;
  return React.cloneElement(<span>{children}</span>, {
    onMouseOver: handleMOver,
    onMouseOut: handleMOut,
  });
};

export const TooltipContainer = () => {
    return (
      <span id="simple-tooltip">
        <span id="simple-arrow"></span>
      </span>
    );
  };
  
