Readme 

# Memory 

Memory is a classic game played by attempting to remember where objects are when hidden in order to find their pairs. I wanted to create a project that was fun and eye catching while practicing my newfound JavaScript skills. 

 >insert responsive design image< 

The live website can be found on [GitHub Pages](https://gnikroo.github.io/Project-2/)

To open links in a new browser tab, press CTRL + Click. 

## Table of Contents 
* [User Experience Design (UX)](#UX) 
    * [Features](#Features) 

        * [Wireframes](#Wireframes) 

        * [Visual](#Visual) 

        * [Gameplay](#Gameplay) 

        * [Time Out](#Time-out) 

        * [Game End](#Game-end) 

        * [Modals](#Modals) 

        * [Gameplay](#Gameplay) 

* [Testing Strategy](#Testing-strategy) 

    * [Validator Testing](#Validator-testing) 

    * [Bugs](#Bugs) 

* [Deployment](#Deployment) 

* [Credits](#Credits) 

* [Media](#Media) 

    * [Content](#Content) 

    * [Acknowledgements](#Acknowledgements) 

## UX 

The game was designed to provide a fun, time wasting game that is pleasing to the eye. It is simple and yet provides the opportunity for challenge when desired. 

The buttons and links are designed to be eye catching so that the user can easily find what is needed yet blends seamlessly with the overall design so as not to distract from the game. 

You can find the game rules and scoreboard at the top of the screen. By following either, you can easily navigate to any other page you’d like. The design is smooth with buttons and input fields rounded to complement the 1990’s, neon aesthetic of the cards and font colors. 

### Features 
* Responsive Design across the range of devices available. 
* Navigation is easy to find and utilize. 
* Users can challenge themselves by playing against the clock and past games. 

* The site is fully accessible. 

### Wireframes 

#### Homepage
![Homepage](assets/images/wireframe-pg-1.jpg)
#### Game Rules 
![Game Rules](assets/images/wireframe-pg-2.jpg)
#### Scoreboard (formerly High Scores) 
![Scoreboard](assets/images/wireframe-pg-3.jpg)

### Visual 

Get user’s total screen width and adjust size of cards accordingly.

#### Buttons
The buttons are given styles during hover and when active so that the user is aware of when an irreversable action is about to be committed.

### Gameplay 

The user can click on any card to flip it over to show the inner-face. They will be able to flip over two cards before a function is executed to: if {match, remain visible} else {become hidden}. 

### Time Out 

If the user takes longer than 3 minutes to complete the game, a modal will pop up informing the user that the game has ended and ask if they would like to reset. 

### Game End 

Once all cards are flipped over, the user has won. The time can be logged to the scoreboard or the user can opt to click outside of the modal to get back to the winning game. If the user presses the reset button, the timer will reset and the cards will reshuffle.  

### Modal 

A modal appears after winning the game to inform the user how long it took to win and prompts them to log the score to the scoreboard with a name.

## Testing Strategy 
 
The game works in different browsers: Chrome, Firefox, Safari.

It is responsive, has a cohesive look, and functions across standard screen sizes using the devtools device toolbar.

I confirmed that the navigation (including buttons and links), logo, game rules, and scoreboard are understandable and adhere to the neon theme.

I have confirmed that the form works, requires a name entry to submit (by pressing Enter or clicking the Submit button), and will exit if the user clicks outside of the modal.

The modal appears when the game is one as expected and disappears after acheiving its function.
 
### Validator Testing 
* HTML 
  * No errors were returned when passing through the official W3C Validator. [Report](https://validator.w3.org/nu/?doc=https%3A%2F%2Fgnikroo.github.io%2FProject-2%2F) 
* CSS 
  * No errors were returned when passing through the official W3C CSS Validation Service - Jigsaw. [Report](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fgnikroo.github.io%2FProject-2%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) 
* JavaScript 
  * No errors were returned when passing through the validator service at JSHint.com for both .js files. 
    * [Script Report](/assets/images/script-js.jpg)
    * [Score Report](/assets/images/score-js.jpg) 
* Lighthouse  
  * The lighthouse report gave a score of 68, 100, 100, 92. [Report](/assets/images/lighthouse.jpg) 

### Bugs 
Bugs found included reset game button allowing the user to flip the cards even though the start game button hadn't been clicked. This was easily remedied by changing some of the names within the functions. 

## Deployment 
My site was deployed to Github pages. In settings for my Memory game project repository, I selected the main branch in the source section. The link was then generated publishing the website.  
* From the GitHub repository, select settings   
* Click the pages link from the left-hand menu  
* In the source section drop-down menu, choose main branch   
* The page will then refresh with indicating successful deployment.    

## Credits 
### Media 
* All images can be found on [Pexels](https://www.pexels.com/).
* Favicon was downloaded with permission from [freefavicon](https://freefavicon.com/).  
 
### Content  

* The function for formatting time (formatTime) was inspired by the answer supplied by user powtac on [stackoverflow](https://stackoverflow.com/a/6313008). 

* My card grid was created with the support of [CSS Tricks’](https://css-tricks.com/dont-overthink-flexbox-grids/) article on flexbox grids. 

* The gameModal object was inspired by [W3School's](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal) example on modals. 

* The button pseudo effects are a modified version of [Evans Pauliuts](https://codepen.io/evanscode/pen/KqWRyg) button design found on CodePen.

### Acknowledgements  
 
* I would like to once more thank my husband, Nima Nikroo. JavaScript was nearly impossible to understand until he helped guide me through the steps needed to create the logical functions behind what makes this game work. 