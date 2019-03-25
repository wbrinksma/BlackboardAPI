> This information can be used when creating an assignment column using the api.

### Description

This is how the [Blackboard public API](https://developer.blackboard.com/portal/displayApi/Learn?version=3400.0.0) describes what information should be contained by `config`:

externalId (string, optional): The externalId for this grade column,

name (string): The name of the grade column,

description (string, optional): The description of the grade column,

externalGrade (boolean, optional): Whether this grade column is an external grade column,

score (Score, optional): Settings controlling the numerical scoring of this grade column,

availability (Availability, optional): Settings controlling the availability/visibility of grade column data,

grading (Grading): Settings controlling whether numerical and text grade values for this grade column are calculated, determined based on attempts, or manually entered.

Score {

possible (number, optional): The points possible for this grade column,

}

Availability {

available (string, optional): Whether this grade column is available to students = ['Yes', 'No']

}

Grading {

type (string): The type of Grading settings for this Grade Column; Manual, Calculated, or Attempts based. = ['Attempts', 'Calculated', 'Manual'],

due (string, optional): The date on which attempts are due for the grade column,

attemptsAllowed (integer, optional): Number of attempts allowed for the grade column,

scoringModel (string, optional): The scoring model for the submitted grade column attempts. = ['Last', 'Highest', 'Lowest', 'First', 'Average'],

anonymousGrading (AnonymousGrading): Settings for anonymous grading

}

AnonymousGrading {

type (string): The type of AnonymousGrading settings for this Attempts based Grade Column; None, Date based, or AfterAllGraded = ['None', 'AfterAllGraded', 'Date'],

releaseAfter (string, optional): Date after which grades are released from being anonymized, if AnonymousGrading type is 'Date'.

}

### Full config (pretty printed)

```
{
  "externalId": "string",
  "name": "string",
  "description": "string",
  "externalGrade": true,
  "score": {
    "possible": 0,
    "decimalPlaces": 0
  },
  "availability": {
    "available": "Yes"
  },
  "grading": {
    "type": "Attempts",
    "due": "2019-01-09T10:40:25.550Z",
    "attemptsAllowed": 0,
    "scoringModel": "Last",
    "anonymousGrading": {
      "type": "None",
      "releaseAfter": "2019-01-09T10:40:25.550Z"
    }
  }
}
```

### Basic config (pretty printed)

```
{
  "name": "assignment 1",
  "description": "The homework assignment about arrays.",
  "score": {
    "possible": 10
  },
  "grading": {
    "type": "Attempts",
    "anonymousGrading": {}
  }
}
```

### Form data (JSON object)

```
{
columnName: hello
gradebookDisplayName: is it me you're looking for?
descriptiontext_f: null
descriptiontext_w: null
descriptiontype: H
textbox_prefix: descriptiontext
descriptiontext: <p>:)</p>
schema: _123418_1
secondarySchema: 0
categoryId: {unset id}
pointsDisplay: 3
rubrics_gradableItem: null
duedate_datetime: null
pickdate: null
pickname: null
duedate_date: null
duedate_time: null
scorable: true
visible: true
showStatToStudent: false
bottom_Submit: Submit
hideAttempt: false
course_id: _20166_1
position: 0
actionType: create
gradeableItemId: null
primarySchemaChanged: false
originalPrimarySchema: null
usedInCalculation: false
toolComputedPoints: null
}
```
