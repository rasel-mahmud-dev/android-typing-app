export function getLesson(lessonsArr, lessonSection, lessonName, nextIndex = -1){
	
	let lesson = null
	if (lessonSection) {
		let secIndex = lessonsArr.findIndex(sec => sec.label === lessonSection)
		
		if (nextIndex !== -1) {
			let nextLesson = lessonsArr[secIndex].items[nextIndex]
			lesson = {
				...nextLesson,
				lessonSection: lessonsArr[secIndex].label,
				nextLessonIndex: (nextIndex + 1) < lessonsArr[secIndex].items.length ? nextIndex + 1 : 0
			}
		} else {
			let lessonIndex = lessonsArr[secIndex].items.findIndex(lesson => lesson.label === lessonName)
			lesson = {
				...lessonsArr[secIndex].items[lessonIndex],
				lessonSection: lessonsArr[secIndex].label,
				nextLessonIndex: (lessonIndex + 1) < lessonsArr[secIndex].items.length ? lessonIndex + 1 : 0
			}
		}
		
	} else {
		
		lessonsArr.map(eachLess => {
			if (nextIndex !== -1) {
				lesson = {
					...eachLess.items[nextIndex],
					lessonSection: eachLess.label,
					nextLessonIndex: (nextIndex + 1) < eachLess.items.length ? nextIndex + 1 : 0
				}
			} else {
				let a = eachLess.items.findIndex(lesson => lesson.label === lessonName)
				if (a !== -1) {
					lesson = {
						...eachLess.items[a],
						lessonSection: eachLess.label,
						nextLessonIndex: (a + 1) < eachLess.items.length ? a + 1 : 0
					}
				}
			}
		})
	}
	return lesson
}


export function getLessonFavorite(lessonsArr,  lessonName, nextIndex = -1){
	let lesson;
	if(lessonsArr) {
		let index=	lessonsArr.findIndex(l => l.label === lessonName)

		if(index !== -1){
			lesson = {
				...lessonsArr[index],
				lessonSection: "favorite",
				nextLessonIndex: index
			}
		}
	}
	return lesson
}