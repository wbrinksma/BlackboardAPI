> This file was used by the developers and now serves purely as reference.

# Request from API

## Request headers:

```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7
Connection: keep-alive
Content-Length: 2912
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryBuzwifdqbvl6pweS
Cookie: JSESSIONID=CD1156B5B3BFBADD3E85892484F22184; NSC_167462_wjq_46.183.240.216*443=ffffffff090b1dcb45525d5f4f58455e445a4a4229a0; JSESSIONID=77F80B760C6B41B5D7ED77CC4C336F44; COOKIE_CONSENT_ACCEPTED=true; session_id=6DB79B579F80D951108495E67B097F8E; s_session_id=0D9A4032485DAFBCCC40DCFB633B5C41; web_client_cache_guid=96c1b61c-041a-4930-bc55-fcbe0f671f6d
Host: blackboard.nhlstenden.com
Origin: https://blackboard.nhlstenden.com
Referer: https://blackboard.nhlstenden.com/bbcswebdav/courses/TECH_E_16_369/app_loader_webpack.html?user=jan
User-Agent: Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
```

## Form Data:

```
blackboard.platform.security.NonceUtil.nonce: 52000906-8e00-4b96-a581-239e1d15e50d
courseId: _20166_1
actionType: create
columnName: foo_assignment
gradebookDisplayName: bar
descriptiontext_f:
descriptiontext_w:
rubrics_gradableItem:
duedate_datetime:
pickdate:
pickname:
duedate_date:
gradeableItemId:
originalPrimarySchema:
duedate_time:
pointsDisplay: 10
courseId: _20166_1
position: 0
scorable: true
visible: true
hideAttempt: false
descriptiontype: H
textbox_prefix: descriptiontext
descriptiontext: <p>:)</p>
primarySchemaChanged: false
bottom_Submit: Submit
usedInCalculation: false
```

# Request from actual blackboard

## Request Headers:

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7
Cache-Control: max-age=0
Connection: keep-alive
Content-Length: 636
Content-Type: application/x-www-form-urlencoded
Cookie: JSESSIONID=80FE30C64A2F9620ED4C667DE84E2C8D; COOKIE_CONSENT_ACCEPTED=true; NSC_167462_wjq_46.183.240.216*443=ffffffff090b1ab845525d5f4f58455e445a4a4229a0; JSESSIONID=C441C45186B55D938B3B92B48EF1D366; session_id=B2CBF46869D05E3E0973184B713C56F0; s_session_id=3EBAE57BD30FF1F8EA6C443FFBBD90F2; web_client_cache_guid=c3f923cb-ce17-4907-860d-b3cb8d9f1ac0
Host: blackboard.nhlstenden.com
Origin: https://blackboard.nhlstenden.com
Referer: https://blackboard.nhlstenden.com/webapps/gradebook/do/instructor/addModifyItemDefinition?course_id=_20166_1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
```

## Form Data:

```
blackboard.platform.security.NonceUtil.nonce: 15906191-d96b-420f-9e7f-68273e845a6e
columnName: ddd
gradebookDisplayName:
descriptiontext_f:
descriptiontext_w:
descriptiontype: H
textbox_prefix: descriptiontext
descriptiontext:
schema: _123418_1
secondarySchema: 0
categoryId: {unset id}
pointsDisplay: 1
rubrics_gradableItem:
duedate_datetime:
pickdate:
pickname:
duedate_date:
duedate_time:
scorable: true
visible: true
showStatToStudent: false
bottom_Submit: Submit
hideAttempt: false
course_id: _20166_1
position: 0
actionType: create
gradeableItemId:
primarySchemaChanged: false
originalPrimarySchema:
usedInCalculation: false
toolComputedPoints:
```

# Diff

## Request headers

- Content-Type

- Updgrade-Insecure-Requests

- Referer

## Form data

- secondarySchema: 0

- categoryId: {unset id}

- toolComputedPoints:

- Schema
