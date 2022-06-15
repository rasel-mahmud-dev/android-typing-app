import  {h} from 'preact';
import {PureComponent} from "preact/compat";
import InputGroup from "../components/InputGroup";
import SelectGroup from "../components/SelectGroup";
import {connect} from "../context/AppContext";


class AddNewLesson extends PureComponent {
	
	constructor() {
		super();
		this.state = {
			lessonData: {
				text: "",
				label: "",
				lessonSection: ""
			}
		}
		
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleAddLesson(e){
		e.preventDefault();
		Android && Android.addLesson("ASDDDDDDDDDDDDDDDDDDDDDDD")
	}
	
	handleChange(e){
		const {name, value, type} = e.target
		this.setState({
			...this.state,
			lessonData:{
				...this.state.lessonData,
				[name]: value
			}
		})
	}
	
	render() {
		return (
			<div>
				<h1 className="text-center text-lg text-white font-medium">Add New Lesson</h1>
				
				<form onSubmit={this.handleAddLesson}>
					
					{/*<InputGroup name="lessonSection" value={this.state.label} label="Enter lesson title" />*/}
					
					<SelectGroup
						options={this.props.state?.lessons ? this.props.state?.lessons : [] }
						onChange={this.handleChange}
						name="lessonSection"
						value={this.state.lessonSection}
						label="Select lesson section" >
						<option value="">Select a section</option>
					</SelectGroup>
					
					<div className="mt-8" />
					<InputGroup
						onChange={this.handleChange}
						name="label"
						value={this.state.label}
						label="Enter lesson title"
					/>
					
					<div className="mt-8" />
					<InputGroup
						onChange={this.handleChange}
						name="text"
						value={this.state.text}
						label="Enter lesson Text"
					/>
					
					<div className="mt-8" />
					<button className="btn btn-primary">Add </button>
				</form>
				
				
			</div>
		);
	}
}


AddNewLesson.propTypes = {};
export default connect(AddNewLesson);