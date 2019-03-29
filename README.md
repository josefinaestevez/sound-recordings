## Sound Recording Metadata Matcher Prototype

### Dependencies

- docker & docker-compose
- npm  

### Running

- Run `$ ./run.sh`  

	*Thats it!*

### Answers

* At first, for every input record I've filtered sound records that matchs with any of their corresponding fields. Then, to calculate similarity I've used SequenceMatcher, a python lib that has a ratio() method, which returns a float between 0 and 1 measuring the similarity of the sequences. I've calculated similarity of each field, and then the average.

* I would do changes to improve my solutions:

    - [ ] I would create a celery task to do the matching calculation. So if we have million objects in our database this keeps the task out of the application's context.

    - [ ] If we need this calculation beign fast, we could use Elastic Search to do fast queries with Sound Recording model.

* ~~The only frontend framework with I have experience working with is Angular 1. As Angular has many newest and different versions, I've decided to learn a new framework, so I've choose React to implement this solution. And why React instead of Vue? According on what I've researched, has a bigger community and support and is the most popular framework out in these days.~~

* Since I've been working with Vue.js since a few months, I've decided to re-implement this frontend part of the exercise, as a practice and also as a sign of interest. Also, last week Vue.js became the second most starred project on GitHub :). About implementation, I've used eventBus for components communication. I could have used vuex instead, but for this problem I thought it was simpler to do it in this way.

* To improve the user experience:

    - [ ] Showing input reports, in case we have a large amount of input reports, I would show at first only a part of them to load page faster. I would add pagination and let users search by text to filter the table.

    - [ ] Once user clicks on one, I would clear the table, letting only the selected input report with their corresponding matches, with a back button to go back to the previous table.

    - [ ] I would add a spinner with a message while candidate is being updated as selected.

    - [ ] Also I would add some messages, for example once user selects a match: "Candidate xxx was selected for input report xxx successfully! Now you can continue matching"