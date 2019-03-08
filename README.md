# Trivia-Game

## Summary
This is a very simple demonstration of a timed trivia game (with a loose definition of what counts as trivia).

## Components
The visuals are simple, and consist of a title, a timer, a start button, a question while the game is running as well as possible answers, right and wrong answer screens, and a post-trivia score screen.  Elements are hidden and shown as the game progresses based on current context (eg, hiding the right and wrong answer informtion while a question is still on screen).

## Tools
Javascript and jquery are the significant majority of the work in this; html and css are minimal.  The focus is on managing interval timers to give a set time to answer questions, and a set time to display right and wrong screens.  On-click events are used to select answers during the timer.