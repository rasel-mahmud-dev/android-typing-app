import  {h} from 'preact';
import {useState} from "preact/compat";

const InputGroup  = (props)=>{
	const {type="text", label, placeholder, name, value, onChange} = props
	
	const [isFocus, setFocus] = useState(false)
	
	return (
		<div className="input-group">
			<label onClick={()=>setFocus(true)} htmlFor={name}>{label}</label>
			
			<input
				onClick={()=>setFocus(true)}
				className={[isFocus ? "input-focused" : "input-blur", "input"].join(" ")}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}
export default InputGroup