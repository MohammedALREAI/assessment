
# Project Document

- for  running the backend  I used   ``` json-server``` will  see the file to  run  it  using this command  json-server --watch db.json don't  forget  install  packages
```pnpm  i```
 then  runt  
```json
npm run server
```
- will see the shape of projects and the data in  the  db.json file and the server will run on port 3001

for  the front to run 
```json
npm run dev
```

- Some pages, like get data by ID, try to get ID. If some error happens, it may redirect to another page. For me, just show the error. If businesses need to show a 404 page, we can do it.


- any recommendation or other thing I can do just tell me and I will do it as soon as possible

- about this "When updating the project name of a favorited project, the project name in "Favorite Projects" shall be updated as well. It is expected to be 
implemented with an elegant solution"


I understand you need to see reflective data after updating the project, but I don't know if that's what you need.



- I did not try to use any other library for state management just used context and reducer that is built in React for just make code simple and did not use any external library just to use the power of react.

