import {h} from "preact"
import AppContext, {connect} from "../context/AppContext";
import {useContext, useState} from "preact/compat";
import {Link} from "preact-router"

function HomePage(props){
	const [ context, setContext ] = useState("all") // love
	
	const appContext = useContext(AppContext);
	
	function changeItem(){
		setContext(context === "all" ? "love" : "all")
	}
	
	
	function renderAllLesson(){
		return appContext.state.lessons &&  appContext.state.lessons.length > 0 && (
			
			<div>
				{ appContext.state.lessons.map(lesson=>(
					<div className="p-5 my-4">
						<h4 className="font-medium my-1">{lesson.label}</h4>
						<div className="mt-4">
							{lesson.items && lesson.items.map(item=>(
								<li className="lesson_link">
									<Link className="" href={`#/play/${lesson.label}/${item.label}`}>{item.label}</Link>
								</li>
							))}
						</div>
					</div>
				
				)) }
			</div>
		
		)
	}
	
	
	function renderFavoriteLesson(){
		return <div>
			{ appContext.state.favoriteLessons.map(lesson=>(
				<div className="p-5 my-4">
					<li className="lesson_link">
						<Link className="" href={`#/play/favorite/${lesson.label}`}>{lesson.label}</Link>
					</li>
				</div>
			)) }
		</div>
	}
	
	return(
		<div>
			<div className="lesson_tabs">
				<div onClick={changeItem} className={["lesson_tabs__item", context === "all" ? "lesson_active": ""].join(" ")}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>
					All Lessons
				</div>
				<div onClick={changeItem} className={["lesson_tabs__item", context === "love" ? "lesson_active": ""].join(" ")}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
					Favorite
				</div>
			</div>
			<div>
				{ context === "all" ? renderAllLesson() : renderFavoriteLesson()  }
			</div>
			
		</div>
	)
}

export default HomePage