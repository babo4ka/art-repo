import example_gif from '../examples.gif';
import example_gif2 from '../examples2.gif';
import './Example.scss';


const Example = (props)=>{
    const className = "example_holder " + props.className;
    let exmpl_gif;
    if(props.num == 1){
        exmpl_gif = example_gif;
    }else{
        exmpl_gif = example_gif2;
    }
    return(
        <div className={className}>
            <img className="example" src={exmpl_gif}></img>
        </div>
    )
}

export default Example;