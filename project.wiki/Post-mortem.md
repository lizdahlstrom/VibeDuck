# Vibeduck - Playlist generator

_Liz Dahlström 2020-06-01_

## Abstract

From idea to deployment, creating the web application VibeDuck entailed planning a software development project which involved a range of different methods, tools and technologies. This report aims to cover the background of the project and the approach which was taken when working on it, as well as to conclude the positive and negative experiences that were found along the way. It lifts the usefulness of documentation, planning, code quality and tests, and brings up the struggle of estimating how much time a task will take to complete, and the consequences it had on the project.

## Project background and overview

### Purpose

The purpose of the project was to develop a web application that generates customized [Spotify](https://www.spotify.com/) playlists. The application would offer an alternate way of discovering new music, and of creating playlists suited to any personal taste that the Spotify user might have. By first letting the user input data such as tracks, artists and/or genres they prefer and optional further parameters, the application would then be able offer to generate a playlist based on it. The result would be a highly customized, and automatically generated Spotify playlist – all done in a brief moment.

### Methods

The project has been planned, documented, developed and tested over a time period of 10 weeks, and for a total of nearly 200 hours. It was started off by the authoring of a *vision document* which was used as a baseline for the project. Following [Linnaeus University’s](https://lnu.se/en/) tailor-made version of [Unified process](https://en.wikipedia.org/wiki/Unified_Process) (UP), the project went through the phases: “inception”, “elaboration”, “construction” and “transition”. [Scrum](https://www.scrum.org/resources/what-is-scrum) was used to plan and implement the development on a week to week basis, with the use of weekly “sprints” and the Scrum artifacts [Product backlog](https://www.scrum.org/resources/what-is-a-product-backlog) and [Sprint backlogs](https://www.scrum.org/resources/what-is-a-sprint-backlog). Weekly tutor-led Scrum-like meetings were attended to with a small group of students each working on their own separate projects.

### Technologies

VibeDuck’s frontend is mainly built using [React](https://reactjs.org/), a popular JavaScript framework, and was based on [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). The backend is built with Node, Express and Firebase Functions.

- [Visual Studio Code](https://code.visualstudio.com/) (IDE)
- [Node.js](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Git](https://git-scm.com/) (version control)
- [Material UI (MUI)](https://material-ui.com/) (UI framework)
- JavaScript
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Firebase](https://firebase.google.com/)

## Findings

### Positive

Learning a popular frontend framework like React has both been fun and also very challenging. I did not have any prior experience in working with React before the start of the project. It turned out that React was a good choice, and I am happy that I made the decision to use it. Because of its popularity there are plenty or resources and help to find when trying to solve a problem. After getting over the “bump” of learning React I found that it is actually very pleasant to work with, and I found myself implementing new features with ease. I also had a good experience working with Firebase. It was very easy to set up configure to work with the application. Even though I struggled in the beginning to set up a backend, it had more to do with my lack of experience than the tools.

I found the weekly *sprints* to be very useful when planning my time and project. The Scrum elements that were implemented as whole were very pleasant to work with (Product backlog, Sprint backlogs etc.). I never felt lost on what to do next in the project, and it gave me a well-needed structure (more so than I usually have). I even ended up loosely using Scrum to plan other activities during the weeks.

Another good experience I had was carrying through a few [usability tests](https://www.nngroup.com/articles/usability-testing-101/) , these tests offered many ideas on possible improvements and additional functionality of the application. I was also able to find a couple of bugs at the same time. I will definitely carry out tests of this kind if the occasion arises in the future.

I did take time to refactor, comment/document and clean up the code. I am very happy that I did that, because it made it easier to navigate and change the code as it grew.

### Negative

I repeatedly failed to implement automated tests. The time I had planned for doing it kept running out for a couple of weeks, and I moved on to other things in the planning. The problem with that was that the code that needed to be tested kept growing, but no tests were being written. One of the reasons why I got stuck was because I was using the framework MUI, which simply put, made it more complicated to write tests. If I had not relied on a big framework like MUI, it would have given me more control over the code and it would therefore have been easier to test. I nevertheless should have put more time aside to implement automated tests from the very start, and it is definitely something that I will do in future projects.

In the beginning I had problems to correctly assess how much time each task would need. I suppose this is something that comes with being inexperienced. I also had problems with getting distracted by things that were not planned for at all - *just because I wanted to do them*, or getting stuck with one problem for hours even though it would be a minor problem. As the weeks progressed, I did learn how to better move on from one problem if I would get stuck, and furthermore to try and focus on whatever task I had actually planned for. This is something that I will take note of from the beginning in the future.

## Conclusion

There are some things I would have done differently if I had the knowledge I had today. For example, I would have made the implementation of automated tests a priority in the beginning of the project. Even though the manual tests have been successful, they are time consuming. And I would gladly have had the experience of using automated tests with React with me after finishing the project.

The negative aside, I am very happy with how the product turned out. There are still requirements left in the product backlog, and I look forward to finishing them. Given the response I have gotten from letting people test the application I feel encouraged to continue developing it. My plan is to take my time and add automated tests for any new code that I add where it is appropriate.

I am also very happy with the knowledge I take with me from the project. I found Scrum very useful, and I am sure that I will implement parts of it in my own planning in the future. The vision document was something I enjoyed coming back to and motivate me, but it would also help me to keep on track during the course of the project. I did manage to put together and deploy a complete web application “by myself”, all whilst learning new technologies and how to work with them. This itself has made me more confident in my abilities to solve problems and write code.

