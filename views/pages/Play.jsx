import  {h} from 'preact';
import {PureComponent} from "preact/compat";
import AppContext, {connect} from "../context/AppContext";

import "./play.scss";
import {getLesson, getLessonFavorite} from "../actions";
import correctSound from "../assets/sound/key.mp3"
import errorSound from "../assets/sound/error.mp3"

import star1 from "../assets/sound/star1.mp3"
import star2 from "../assets/sound/star2.mp3"
import star3 from "../assets/sound/star3.mp3"


class Play extends PureComponent {
	// static contextType = AppContext;
	
	bigLetterTimeId = 0
	
	constructor() {
		super();
		this.state = {
			currentIndex: 0,
			currentPressedLetter: "",
			correctIndex: [],
			isMute: false,
			finished: false,
			lesson: {
				textArr: []
			},
		}

		this.correctAudio = new Audio(correctSound)
		this.errorAudio = new Audio(errorSound)
		
		this.star1 = new Audio(star1)
		this.star2 = new Audio(star2)
		this.star3 = new Audio(star3)
	}
	

	
	componentDidMount() {
		if(this.props.state.lessons){
			let lesson;
			
			
			if(this.props.lessonSection === "favorite") {
			 	lesson = getLessonFavorite(this.props.state.favoriteLessons, this.props.lessonName)
			} else {
				lesson = getLesson(this.props.state.lessons, this.props.lessonSection, this.props.lessonName)
			}
			this.setState({
				...this.state,
				lesson: {
					...this.state.lesson,
					...lesson,
					textArr: lesson.text.split("")
				}
			})
		}
		
		window.addEventListener("keypress", this.progressHandler)
	}
	
	componentWillUnmount() {
		window.removeEventListener("keypress", this.progressHandler)
	}
	
	componentDidUpdate(previousProps, previousState, snapshot) {
		this.bigLetterTimeId && clearTimeout(this.bigLetterTimeId)
		
		if(previousProps.state.lessons !== this.props.state.lessons){
			if(this.props.state.lessons) {
				let lesson = getLesson(this.props.state.lessons, this.props.lessonSection, this.props.lessonName)
				this.props.setState({lesson: lesson})
				this.setState({
					...this.state,
					lesson: {
						...this.state.lesson,
						...lesson,
						textArr: lesson.text.split("")
					}
				})
			}
		}
		
		
		if(previousState.currentPressedLetter !== this.state.currentPressedLetter){
			this.bigLetterTimeId = setTimeout(()=>{
				this.setState({
					...this.state,
					currentPressedLetter: ""
				})
			}, 100)
		}
		
	}
	
	handleResetState(){
		this.setState({
			...this.state,
			finished: false,
			currentIndex: 0,
			currentPressedLetter: "",
			correctIndex: [],
		})
	}
	
	handleJumpNextLesson(e){
	
	}
	
	playCongratulationSound(){
		if (!this.props.state.isMute) {
			this?.star1.play()
			
			setTimeout(() => {
				this?.star2.play()
			}, 600)
			
			setTimeout(() => {
				this?.star3.play()
			}, 1200)
		}
	}
	
	progressHandler=(e)=>{

		let value = e.key
		let updateState = {...this.state}
		
		let textArr = updateState.lesson.textArr;
		if (e.key === "Enter") {
			if (e.shiftKey) {
				this.handleJumpNextLesson()
			} else {
		
				if(updateState.currentIndex === updateState.lesson.textArr.length) {
					this.handleResetState()
				} else {
					// this.handleResetState()
				}
			}
			return;
		}
		
		/* when lesson completed
			return noting to avoid next line code
		*/
		if(updateState.finished){
			return false
		}
		
		updateState.currentPressedLetter = value
		
		if (textArr[updateState.currentIndex].toUpperCase() === value.toUpperCase()) {
			this.keyPressSound()
			updateState.correctIndex = [...updateState.correctIndex, updateState.currentIndex],
			updateState.currentPressedLetter = value
			updateState.currentIndex = updateState.currentIndex + 1
		} else {
			this.keyPressSound(true)
			console.log("wrong")
		}
		
		if(updateState.currentIndex === updateState.lesson.textArr.length ) {
			this.playCongratulationSound();
			updateState.finished = true
		}
		
		this.setState(updateState)
		
	}
	
	changeName = (name)=>{
		this.props.state.setState({name: "ASDDDDDDDDDD"})
	}
	
	
	keyPressSound(isError=false){
		if(!this.props.state.isMute){
			if(isError){
				this.errorAudio?.play();
			} else {
				this.correctAudio?.play()
			}
		}
	}
	
	
	render() {
		let textArr = this.state.lesson.textArr;
		

		let a = ""
		let b = ""
		if(textArr[this.state.currentIndex - 1]){
			a = textArr[this.state.currentIndex - 1].toUpperCase()
		}
		if(this.state.currentPressedLetter){
			b = this.state.currentPressedLetter.toUpperCase()
		}
		
		let isCorrectPressed = a === b
		
		return (
			<div>
				
				<h1 className={["big-letter", isCorrectPressed ? "correct": "wrong"].join(" ")}>{this.state.currentPressedLetter}</h1>
				
				<div className="text">
					{ textArr && textArr.map((letter, index)=>(
						<li className={[
							this.state.currentIndex === index ? "focus": "",
							letter === " " ? "white-space":"",
							this.state.correctIndex.indexOf(index) !== -1 ? "passed": ""
						].join(" ")} >
							{letter}
							{this.state.currentIndex === index && <span className="caret" /> }
						</li>
					)) }
				</div>
				
			</div>
		);
	}
}

Play.propTypes = {
	state: {
		lessons: Array,
	},
	setState: Function,
	lessonName: String,
	lessonSection: String
};

export default connect(Play);