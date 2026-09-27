// Elsinore Escape — puzzle content.
// Quotations follow standard modern editions of Hamlet (act.scene references are Folger-style).
// Types:
//   speaker — a quotation; pick who says it
//   choice  — multiple choice (plot, meaning, close reading)
//   order   — put events or lines in the correct order (items listed in the correct order; the game shuffles them)
//   door    — type the missing word to open the chamber door (answers: accepted spellings, lowercase)
export const CHAMBERS = [
  {
    act: 'I',
    name: 'The Battlements',
    tagline: 'Midnight on the castle walls. The guards have seen something.',
    puzzles: [
      {
        type: 'speaker', ref: '1.4',
        quote: 'Something is rotten in the state of Denmark.',
        options: ['Horatio', 'Marcellus', 'Hamlet', 'Bernardo'],
        answer: 'Marcellus',
        hint: 'It is not Hamlet. One of the guards says it as Hamlet follows the Ghost.',
        explain: 'Marcellus says it as Hamlet follows the Ghost. The line sets up the play’s image of Denmark as diseased or corrupt.'
      },
      {
        type: 'order', ref: 'Act 1',
        prompt: 'Put these events from Act 1 in order.',
        items: [
          'The guards and Horatio see the Ghost on the battlements.',
          'Claudius and Gertrude urge Hamlet to stop mourning his father.',
          'Laertes and Polonius warn Ophelia to keep away from Hamlet.',
          'The Ghost tells Hamlet that Claudius murdered him.'
        ],
        hint: 'The play opens at night with the guards; the Ghost does not speak to Hamlet until the last scene of the act.',
        explain: 'Scene 1 is the guards and the Ghost. Scene 2 is the court and Claudius. Scene 3 is Laertes, Polonius, and Ophelia. In Scene 5 the Ghost finally speaks to Hamlet.'
      },
      {
        type: 'choice', ref: '1.2',
        prompt: '“A little more than kin, and less than kind.” What does Hamlet mean by this aside about Claudius?',
        options: [
          'Claudius is now more than a relative (uncle and stepfather), but Hamlet feels no warmth or kinship with him.',
          'Claudius is a kind man who deserves more respect than he is given.',
          'Hamlet wishes Claudius were a closer relative so he could inherit the throne.',
          'Hamlet is joking that Claudius is not really related to the royal family.'
        ],
        answer: 0,
        hint: 'Kin means family. Kind has two meanings here: gentle, and of the same nature.',
        explain: 'Hamlet puns on “kin” and “kind.” Claudius is now doubly related to him as uncle and stepfather, but they are not alike and Hamlet feels no affection for him.'
      },
      {
        type: 'choice', ref: '1.5',
        prompt: 'According to the Ghost, how was King Hamlet murdered?',
        options: [
          'Claudius poured poison into his ear while he slept in the orchard.',
          'Claudius stabbed him during a hunting trip.',
          'Gertrude put poison in his wine at a feast.',
          'He was killed in battle against Norway, and Claudius let it happen.'
        ],
        answer: 0,
        hint: 'The official story is that a serpent stung him while he slept.',
        explain: 'The Ghost says Claudius poured “juice of cursèd hebona” into his ear as he slept in the orchard. Remember this detail: the play-within-a-play in Act 3 restages it.'
      }
    ],
    door: {
      ref: '1.5',
      prompt: 'The Ghost’s parting words to Hamlet: “Adieu, adieu, adieu! _______ me.”',
      answers: ['remember'],
      hint: 'Hamlet repeats this word again and again after the Ghost leaves.',
      explain: '“Remember me.” Hamlet swears to wipe everything else from his memory and remember only his father’s command.'
    }
  },
  {
    act: 'II',
    name: 'Polonius’s Study',
    tagline: 'Everyone is watching Hamlet. Hamlet is watching everyone.',
    puzzles: [
      {
        type: 'speaker', ref: '2.2',
        quote: 'Though this be madness, yet there is method in ’t.',
        options: ['Hamlet', 'Polonius', 'Claudius', 'Rosencrantz'],
        answer: 'Polonius',
        hint: 'The speaker says it in an aside while questioning Hamlet, and suspects his madness might not be what it seems.',
        explain: 'Polonius says it in an aside after Hamlet’s sharp, witty answers. Even Polonius notices that Hamlet’s “madness” has a strange logic to it.'
      },
      {
        type: 'choice', ref: '2.2',
        prompt: 'Polonius tells the King and Queen, “Brevity is the soul of wit.” Why is this line ironic?',
        options: [
          'Polonius is famously long-winded, and he says it in the middle of a rambling speech.',
          'Polonius is actually the wittiest character in the play.',
          'The King asks him to speak at length, and he refuses.',
          'Polonius is quoting Hamlet, whom he considers foolish.'
        ],
        answer: 0,
        hint: 'Brevity means using few words. Does Polonius use few words?',
        explain: 'Polonius praises brevity while being anything but brief. Gertrude even interrupts him: “More matter with less art.”'
      },
      {
        type: 'choice', ref: '2.2',
        prompt: 'Why do Rosencrantz and Guildenstern come to Elsinore?',
        options: [
          'Claudius and Gertrude sent for them to find out what is troubling Hamlet.',
          'They are actors hired to perform a play for the court.',
          'Fortinbras sent them to spy on the Danish army.',
          'Hamlet invited them to help him get revenge on Claudius.'
        ],
        answer: 0,
        hint: 'They are Hamlet’s old school friends, but someone else summoned them.',
        explain: 'Claudius and Gertrude summon Hamlet’s old school friends to find out the cause of his “transformation.” Hamlet quickly gets them to admit they “were sent for.”'
      },
      {
        type: 'order', ref: 'Act 2',
        prompt: 'Put these events from Act 2 in order.',
        items: [
          'Polonius sends Reynaldo to spy on Laertes in Paris.',
          'Ophelia tells her father about Hamlet’s strange, disheveled visit.',
          'Claudius and Gertrude welcome Rosencrantz and Guildenstern.',
          'The traveling players arrive, and Hamlet asks for a speech.'
        ],
        hint: 'Scene 1 belongs to Polonius’s household; Scene 2 begins with the King and Queen greeting visitors.',
        explain: 'Act 2 Scene 1 is Polonius, Reynaldo, and then Ophelia. Scene 2 is Rosencrantz and Guildenstern, and later the players.'
      }
    ],
    door: {
      ref: '2.2',
      prompt: 'Hamlet’s plan at the end of Act 2: “The play’s the thing / Wherein I’ll catch the _______ of the King.”',
      answers: ['conscience'],
      hint: 'It is the inner sense of right and wrong that makes guilty people uneasy.',
      explain: 'Hamlet will stage a play that mirrors the murder. If Claudius reacts, his guilty conscience will prove the Ghost told the truth.'
    }
  },
  {
    act: 'III',
    name: 'The Great Hall',
    tagline: 'Tonight the players perform The Mousetrap.',
    puzzles: [
      {
        type: 'order', ref: '3.1',
        prompt: 'Rebuild the opening of Hamlet’s most famous soliloquy.',
        items: [
          'To be, or not to be, that is the question:',
          'Whether ’tis nobler in the mind to suffer',
          'The slings and arrows of outrageous fortune,',
          'Or to take arms against a sea of troubles'
        ],
        hint: 'Hamlet first states the question, then describes the two choices: suffering, or fighting back.',
        explain: 'Hamlet weighs enduring life’s pain (“slings and arrows”) against fighting back or ending it (“take arms against a sea of troubles”).'
      },
      {
        type: 'speaker', ref: '3.1',
        quote: 'O, what a noble mind is here o’erthrown!',
        options: ['Gertrude', 'Ophelia', 'Horatio', 'Claudius'],
        answer: 'Ophelia',
        hint: 'The speaker has just been told “Get thee to a nunnery.”',
        explain: 'After Hamlet’s harsh words in the “nunnery” scene, Ophelia grieves over what she believes is his madness.'
      },
      {
        type: 'choice', ref: '3.2',
        prompt: 'During The Mousetrap, the player pours poison into the sleeping king’s ear. What does Claudius do?',
        options: [
          'He rises, calls for lights, and storms out.',
          'He applauds and asks the players to perform again.',
          'He confesses the murder in front of the court.',
          'He orders the guards to arrest Hamlet on the spot.'
        ],
        answer: 0,
        hint: 'His reaction is not a confession, but it is enough for Hamlet and Horatio.',
        explain: 'Claudius cries “Give me some light. Away!” and leaves. For Hamlet this proves his guilt: “I’ll take the ghost’s word for a thousand pound.”'
      },
      {
        type: 'choice', ref: '3.3',
        prompt: 'Hamlet finds Claudius alone, praying. Why doesn’t he kill him?',
        options: [
          'He fears that killing Claudius at prayer would send his soul to heaven.',
          'Guards arrive before he can draw his sword.',
          'He decides the Ghost was lying after all.',
          'Gertrude begs him to spare Claudius.'
        ],
        answer: 0,
        hint: 'Hamlet thinks about where his father’s soul went, and where Claudius’s soul would go.',
        explain: 'Hamlet wants Claudius damned, not saved, so he waits for a sinful moment. The irony: Claudius admits his prayers are not sincere (“My words fly up, my thoughts remain below”).'
      }
    ],
    door: {
      ref: '3.4',
      prompt: 'In Gertrude’s room, Hamlet stabs Polonius, who is hiding behind the _______ (a hanging tapestry).',
      answers: ['arras', 'arras curtain'],
      hint: 'It is a five-letter word for a wall tapestry, named after a French town.',
      explain: 'Hamlet stabs through the arras, crying “How now, a rat? Dead for a ducat, dead!” He hoped it was Claudius. It was Polonius.'
    }
  },
  {
    act: 'IV',
    name: 'The Queen’s Garden',
    tagline: 'Sorrows arrive, not as single spies, but in battalions.',
    puzzles: [
      {
        type: 'speaker', ref: '4.5',
        quote: 'When sorrows come, they come not single spies, / But in battalions.',
        options: ['Laertes', 'Gertrude', 'Claudius', 'Horatio'],
        answer: 'Claudius',
        hint: 'The speaker lists recent troubles: Polonius’s death, Hamlet’s exile, Ophelia’s madness, and angry citizens.',
        explain: 'Claudius says it to Gertrude as troubles pile up: Polonius murdered, Hamlet gone, Ophelia mad, the people restless, and Laertes secretly back.'
      },
      {
        type: 'choice', ref: '4.3',
        prompt: 'Claudius sends Hamlet to England with sealed letters. What do the letters order?',
        options: [
          'That the King of England put Hamlet to death immediately.',
          'That Hamlet be married to an English princess.',
          'That England send an army to help Denmark fight Norway.',
          'That Hamlet be kept in England until he recovers from his madness.'
        ],
        answer: 0,
        hint: 'Claudius calls Hamlet a fever in his blood (“like the hectic in my blood he rages”) and tells England, “thou must cure me.”',
        explain: 'The letters order Hamlet’s “present death.” Hamlet later rewrites them so that Rosencrantz and Guildenstern are executed instead.'
      },
      {
        type: 'order', ref: 'Act 4',
        prompt: 'Put these events from Act 4 in order.',
        items: [
          'Claudius sends Hamlet to England.',
          'Ophelia, driven mad by grief, sings strange songs to the Queen.',
          'Laertes storms the castle demanding revenge for his father.',
          'Horatio receives Hamlet’s letter about the pirates.',
          'Gertrude reports that Ophelia has drowned.'
        ],
        hint: 'Hamlet leaves first. The act ends with the saddest news of all.',
        explain: 'Hamlet is shipped off (4.3–4.4). In 4.5 Ophelia first appears mad before the Queen, and then Laertes bursts in (she returns with her flowers after). Hamlet’s pirate letter arrives in 4.6, and Gertrude reports the drowning at the end of 4.7.'
      },
      {
        type: 'choice', ref: '4.7',
        prompt: 'How do Claudius and Laertes plan to kill Hamlet?',
        options: [
          'A “friendly” fencing match with an unblunted, poisoned sword, plus a poisoned cup as backup.',
          'An ambush by pirates on his way back from England.',
          'Poison in his ear while he sleeps, as Claudius killed King Hamlet.',
          'A trial for Polonius’s murder that ends in execution.'
        ],
        answer: 0,
        hint: 'Laertes is known for his skill with a rapier.',
        explain: 'Claudius proposes the fencing match. Laertes adds poison to his sword tip, and Claudius prepares a poisoned drink in case Hamlet survives.'
      }
    ],
    door: {
      ref: '4.5',
      prompt: 'Ophelia hands out flowers: “There’s _______, that’s for remembrance.”',
      answers: ['rosemary'],
      hint: 'It is an herb, and its name contains a flower and a name.',
      explain: 'Rosemary for remembrance, and pansies for thoughts. Each flower carries a meaning, and many editors suggest she hands them to particular people in the court.'
    }
  },
  {
    act: 'V',
    name: 'The Graveyard & the Duel',
    tagline: 'The readiness is all.',
    puzzles: [
      {
        type: 'choice', ref: '5.1',
        prompt: '“Alas, poor Yorick! I knew him, Horatio.” Who was Yorick?',
        options: [
          'The late king’s jester, who carried Hamlet on his back when Hamlet was a child.',
          'A gravedigger who once worked at the castle.',
          'Hamlet’s old fencing teacher.',
          'A soldier who died fighting Norway.'
        ],
        answer: 0,
        hint: 'Hamlet remembers his jokes and songs.',
        explain: 'Yorick was the king’s jester, “a fellow of infinite jest.” Holding his skull, Hamlet reflects that death reduces everyone to dust, from jesters to Alexander the Great.'
      },
      {
        type: 'choice', ref: '5.2',
        prompt: '“There’s a divinity that shapes our ends, / Rough-hew them how we will.” What shift in Hamlet does this line show?',
        options: [
          'He now trusts that a higher power (providence) guides events, whatever his own plans.',
          'He has decided to become a priest.',
          'He believes he can control his fate through careful planning.',
          'He blames Horatio for the way events have turned out.'
        ],
        answer: 0,
        hint: 'To rough-hew is to shape something crudely. Who finishes the shaping?',
        explain: 'Hamlet has grown calmer and more accepting. People can roughly shape their lives, but a divine power finishes the shape. Later he says, “The readiness is all.”'
      },
      {
        type: 'order', ref: '5.2',
        prompt: 'Put the events of the final duel in order.',
        items: [
          'Gertrude drinks from the poisoned cup.',
          'Hamlet and Laertes wound each other with the poisoned sword.',
          'Laertes confesses: “The King, the King’s to blame.”',
          'Hamlet kills Claudius.',
          'Fortinbras arrives to find the royal family dead.'
        ],
        hint: 'The Queen drinks during the match; Fortinbras enters only after the last deaths.',
        explain: 'Gertrude drinks a toast to Hamlet. The swords are exchanged in a scuffle and both men are wounded. Dying, Laertes reveals the plot, and Hamlet finally kills Claudius. Fortinbras arrives to claim Denmark.'
      },
      {
        type: 'speaker', ref: '5.2',
        quote: 'Now cracks a noble heart. Good night, sweet prince, / And flights of angels sing thee to thy rest!',
        options: ['Horatio', 'Fortinbras', 'Laertes', 'Osric'],
        answer: 'Horatio',
        hint: 'Hamlet has asked this loyal friend to live on and tell his story.',
        explain: 'Horatio, Hamlet’s loyal friend, speaks this farewell. Hamlet asked him to live on and tell his story truthfully.'
      }
    ],
    door: {
      ref: '5.2',
      prompt: 'Hamlet’s final words: “The rest is _______.”',
      answers: ['silence'],
      hint: 'It is the opposite of speech.',
      explain: '“The rest is silence.” The prince who could not stop talking and thinking falls silent at last.'
    }
  }
];
