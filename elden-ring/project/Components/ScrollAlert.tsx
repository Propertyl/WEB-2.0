
export const ScrollAlert = ({text}:{text:string | string[]}) => {
  return(
    <div className="scroll-alert">
        <p className="scroll-alert-text">{text}</p>
        <div className="scroll-alert-underline">
          <div className="scroll-alert-subline">
            <span className="subline-circle"></span>
          </div>
      </div>
    </div>
  )
}