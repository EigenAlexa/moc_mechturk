import {
  gamePhase, 
  guessSubmitted,
  completedPhase,
  scrollTo
} from '/client/imports/common.js';

import { Session } from 'meteor/session'


var text_example = { "_id" : "asdasdasdasdasdasd", "convo" : [ { "speaker" : "A", "moc" : 39, "tokens" : [ "All", "right", ",", "um" ], "text" : "All right, um" }, { "speaker" : "A", "moc" : 27, "tokens" : [ "I", "think", "the", "topic", "was", "crime", "in", "the", "city", "." ], "text" : "I think the topic was crime in the city." }, { "speaker" : "B", "moc" : 0, "tokens" : [ "Right", "." ], "text" : "Right." }, { "speaker" : "A", "moc" : 27, "tokens" : [ "I", "do", "not", "live", "in", "a", "city", "." ], "text" : "I do not live in a city." }, { "speaker" : "A", "moc" : 27, "tokens" : [ "I", "live", "in", "a", "real", "small", "little", "place", "." ], "text" : " I live in a real small little place." }, { "speaker" : "B", "moc" : 35, "tokens" : [ "Where", "is", "that", "?" ], "text" : "Where is that ?" }, { "speaker" : "A", "moc" : 27, "tokens" : [ "Uh", ",", "it", "'s", "about", "thirty", "miles", "from", "Sherman", "." ], "text" : "Uh, it's about thirty miles from Sherman." }, { "speaker" : "B", "moc" : 34, "tokens" : [ "North", ",", "south", ",", "east", ",", "or", "west", "?" ], "text" : "North, south, east, or west ?" }, { "speaker" : "A", "moc" : 27, "tokens" : [ "It", "'s", "north", "of", "Sherman", "." ], "text" : "It's north of Sherman." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Well", ",", "you", "live", "almost", "in", "Oklahoma", "." ], "text" : "Well, you live almost in Oklahoma." }, { "speaker" : "A", "moc" : 1, "tokens" : [ "Not", "too", "far", "." ], "text" : "Not too far." }, { "speaker" : "B", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "That", "'s", "kind", "of", "ironic", ",", "because", "I", "do", "n't", "live", "too", "far", "from", "Oklahoma", "either", "." ], "text" : "That's kind of ironic, because I don't live too far from Oklahoma either." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 37, "tokens" : [ "You", "know", "where", "Saint", "Joe", "is", "?" ], "text" : "You know where Saint Joe is ?" }, { "speaker" : "A", "moc" : 6, "tokens" : [ "Uh", ",", "I", "'ve", "been", "through", "there", "." ], "text" : "Uh, I've been through there." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "'m", "about", "eight", "miles", "south", "of", "it", "." ], "text" : "I'm about eight miles south of it." }, { "speaker" : "A", "moc" : 17, "tokens" : [ "Okay", "." ], "text" : "Okay." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Oh", ",", "yeah", "." ], "text" : "Oh, yeah." }, { "speaker" : "A", "moc" : 27, "tokens" : [ "I", "had", "been", "through", "Saint", "Joe" ], "text" : "I had been through Saint Joe" }, { "speaker" : "A", "moc" : 28, "tokens" : [ "but", ",", "um", ",", "just", "as", "far", "as", "watching", "the", "news", "and", "reading", "the", "papers", "and", "all", "that", ",", "it", "sounds", "like", "the", "crimes", "in", "the", "cities", "are", "really", "getting", "bad", "." ], "text" : "but, um, just as far as watching the news and reading the papers and all that, it sounds like the crimes in the cities are really getting bad." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Well", ",", "you", "know", ",", "I", "'ve", ",", "I", "'ve", "seen", "those", "statistics", "and", "everything" ], "text" : "Well, you know, I've, I've seen those statistics and everything" }, { "speaker" : "B", "moc" : 28, "tokens" : [ "and", "you", "know", ",", "what", "frightens", "me", ",", "is", "that", ",", "you", "put", "a", "half", "a", "million", "people", "out", "in", "the", "middle", "of", "the", "desert" ], "text" : "and you know, what frightens me, is that, you put a half a million people out in the middle of the desert" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "with", "high", "tech", "weaponry", ",", "you", "know" ], "text" : "with high tech weaponry, you know" }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "the", "Iraqis", "did", "n't", "have", "a", "lot", "of", "high-tech", "weaponry", "but", "they", "had", "mortars", "and", "machine", "guns" ], "text" : "I mean, the Iraqis didn't have a lot of high-tech weaponry but they had mortars and machine guns" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Oh", ",", "yeah", "." ], "text" : "Oh, yeah." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "tanks", "and", "all", "that", "." ], "text" : "tanks and all that." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Sure", "." ], "text" : "Sure." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", ",", "they", "did", "n't", "kill", "as", "many", "people", "in", ",", "in", "forty-five", "days", "and", "they", "were", "intending", "to", "kill", "people" ], "text" : "And, they didn't kill as many people in, in forty-five days and they were intending to kill people" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "I", "mean", ",", "that", "was", "their", "job", ",", "as", "they", "killed", "in", "Washington", "D", "C." ], "text" : "I mean, that was their job, as they killed in Washington D C." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Oh", ",", "I", "know", "I", "know", "." ], "text" : "Oh, I know I know." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "I", "know", "." ], "text" : " I know." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "Um", ",", "I", "think", "nowadays", "people", "just", ",", "really", "just", ",", "murder", "is", "nothing", "to", "them", ",", "you", "know", "." ], "text" : "Um, I think nowadays people just, really just, murder is nothing to them, you know." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Well", ",", "I", "formulated", "a", "pretty", "radical", "theory", "over", "the", "last", "ten", "years", ",", "I", "guess", "." ], "text" : "Well, I formulated a pretty radical theory over the last ten years, I guess." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "And", ",", "I", "'ve", "come", "to", "the", "conclusion", ",", "and", "this", "is", "a", "pretty", "scary", "thought", "to", "me", ",", "even", ",", "that", "if", "a", "guy", "is", "convicted", ",", "or", "a", "gal", "is", "convicted", ",", "of", "a", "crime", ",", "rather", "than", "put", "them", "in", "prison", ",", "because", "prison", "'s", "proven", "not", "to", "work", ",", "just", "let", "them", "go", "." ], "text" : "And, I've come to the conclusion, and this is a pretty scary thought to me, even, that if a guy is convicted, or a gal is convicted, of a crime, rather than put them in prison, because prison's proven not to work, just let them go." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Say", "okay", ",", "you", "'re", "convicted" ], "text" : "Say okay, you're convicted" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "and", "just", "let", "them", "go" ], "text" : "and just let them go" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "and", "if", "they", "get", "convicted", "again", ",", "well", ",", "just", "kill", "them", "." ], "text" : "and if they get convicted again, well, just kill them." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Yeah" ], "text" : "Yeah" }, { "speaker" : "A", "moc" : 28, "tokens" : [ "because", ",", "uh", ",", "most", "likely", "that", "will", "happen", ",", "wo", "n't", "it", ",", "that", ",", "you", "know" ], "text" : "because, uh, most likely that will happen, won't it, that, you know" }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Well", ",", "I", "think", "that", "the", "best", "hope", "to", "eliminate", "crime", ",", "as", "we", "know", "it", "today" ], "text" : "Well, I think that the best hope to eliminate crime, as we know it today" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "is", "to", "eliminate", "the", "criminals", "from", "society", "." ], "text" : "is to eliminate the criminals from society." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "If", "someone", "is", "known", "to", "have", "been", "in", "prison", ",", "they", "ca", "n't", "get", "a", "job", "." ], "text" : "If someone is known to have been in prison, they can't get a job." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "No", "." ], "text" : "No." }, { "speaker" : "B", "moc" : 26, "tokens" : [ "You", "know", "." ], "text" : "You know." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "They", "ca", "n't", "be", "accepted", "into", "society", "." ], "text" : "They can't be accepted into society." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "You", "know", ",", "if", "they", "'re", "not", "going", "to", "be", "accepted", "into", "society", ",", "then", "everybody", "'s", "going", "to", "become", "sociopathic", "." ], "text" : " You know, if they're not going to be accepted into society, then everybody's going to become sociopathic." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 51, "tokens" : [ "And", ",", "you", "know", ",", "who", "'s", "to", "put", "the", "limit", "on", "it", "?" ], "text" : "And, you know, who's to put the limit on it ?" }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "I", "was", "watching", "a", "thing", "last", "night", ",", "up", "in", "Washington", "State", "." ], "text" : "I mean, I was watching a thing last night, up in Washington State." }, { "speaker" : "B", "moc" : 26, "tokens" : [ "If", "you", "get", "convicted", "of", ",", "uh", ",", "sexual", "offenses", ",", "on", "a", "regular", "basis", "." ], "text" : "If you get convicted of, uh, sexual offenses, on a regular basis." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "You", "know", ",", "I", "mean", ",", "some", "of", "these", "guys", "are", "forty", "years", "old", "and", "got", "ten", "convictions", "." ], "text" : "You know, I mean, some of these guys are forty years old and got ten convictions." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", "they", "'re", "still", "let", "out", "on", "the", "street", "after", "one", "or", "two", "years", "." ], "text" : "And they're still let out on the street after one or two years." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Well", ",", "in", "Washington", "State", ",", "if", "you", "'re", "a", "habitual", "sexual", "offender", ",", "they", "just", "do", "n't", "let", "you", "out", "." ], "text" : " Well, in Washington State, if you're a habitual sexual offender, they just don't let you out." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Um", "." ], "text" : "Um." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "So", "you", "serve", "your", "prison", "term", "and", "then", "you", "go", "into", "the", "mental", "hospital", "and", "if", "you", "'re", "pronounced", "cured", ",", "they", "'ll", "let", "you", "go", "." ], "text" : "So you serve your prison term and then you go into the mental hospital and if you're pronounced cured, they'll let you go." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Well", ",", "they", "may", "find", "a", "cure", "for", "it" ], "text" : "Well, they may find a cure for it" }, { "speaker" : "B", "moc" : 27, "tokens" : [ "but", "there", "is", "no", "known", "cure", "now", "." ], "text" : "but there is no known cure now." }, { "speaker" : "A", "moc" : 19, "tokens" : [ "Um", "." ], "text" : "Um." }, { "speaker" : "A", "moc" : 19, "tokens" : [ "So", "you", "'re", ",", "you", "'re", "kind", "of", "thinking", "in", "other", "words", ",", "if", "you", "get", ",", "if", "you", "do", "something", "the", "first", "time", ",", "that", "'s", "not", "real", "bad", ",", "you", "know" ], "text" : " So you're, you're kind of thinking in other words, if you get, if you do something the first time, that's not real bad, you know" }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Hey", ",", "people", "make", "mistakes", "." ], "text" : "Hey, people make mistakes." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "yeah" ], "text" : "yeah" }, { "speaker" : "A", "moc" : 19, "tokens" : [ "to", "go", "ahead", "and", "let", "them", "go", "but", "if", "they", "do", "it", "again", "and", "they", "really", "need", "to", "face", "the", "consequences", "then", ",", "uh", "." ], "text" : "to go ahead and let them go but if they do it again and they really need to face the consequences then, uh." }, { "speaker" : "B", "moc" : 0, "tokens" : [ "Well", ",", "yeah" ], "text" : "Well, yeah" }, { "speaker" : "B", "moc" : 28, "tokens" : [ "use", "that", "or", ",", "you", "know", ",", "there", "'s", "other", "consequences", "rather", "than", "killing", "them", ",", "you", "know", "you", "could" ], "text" : "use that or, you know, there's other consequences rather than killing them, you know you could" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Oh", "." ], "text" : "Oh." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "always", "make", "them", "the", "slave", "of", "the", "people", "they", "committed", "the", "crime", "against", "." ], "text" : "always make them the slave of the people they committed the crime against." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 26, "tokens" : [ "You", "know", "." ], "text" : "You know." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "At", "least", "they", "might", "get", "some", "benefit", "in", "that", "and", "if", "the", "people", "they", "committed", "a", "crime", "against", ",", "feel", ",", "at", "some", "later", "date", ",", "that", "these", "people", "have", "learned", "their", "lesson", ",", "are", ",", "are", "okay", ",", "you", "know", ",", "well", ",", "they", "can", "free", "them", "." ], "text" : "At least they might get some benefit in that and if the people they committed a crime against, feel, at some later date, that these people have learned their lesson, are, are okay, you know, well, they can free them." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "But", ",", "uh", ",", "you", "know", ",", "with", "the", "technology", "we", "have", "today", ",", "you", "can", "put", "a", "collar", "on", "a", "guy", "'s", "leg", "that", "will", "knock", "him", "down", "if", "they", "leave", "the", "property", "." ], "text" : "But, uh, you know, with the technology we have today, you can put a collar on a guy's leg that will knock him down if they leave the property." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "it", "will", "just", "in", "incapacitate", "them", "." ], "text" : " I mean, it will just in incapacitate them." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", ",", "you", "can", "put", "a", "collar", "around", "a", "guy", "'s", "leg", "that", "will", "prohibit", "them", "from", "committing", "any", "kind", "of", "prohibitive", "act", "." ], "text" : "And, you can put a collar around a guy's leg that will prohibit them from committing any kind of prohibitive act." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "But", ",", "you", "know", ",", "putting", "them", "in", "prison", ",", "my", "God", ",", "that", "does", "n't", "work", "." ], "text" : "But, you know, putting them in prison, my God, that doesn't work." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "No", "apparently", "not" ], "text" : "No apparently not" }, { "speaker" : "A", "moc" : 28, "tokens" : [ "because", "look", "how", "many", "years", "they", "'ve", "been", "doing", "that" ], "text" : "because look how many years they've been doing that" }, { "speaker" : "A", "moc" : 26, "tokens" : [ "and", "look", "I", "mean", ",", "yeah", "." ], "text" : "and look I mean, yeah." }, { "speaker" : "B", "moc" : 30, "tokens" : [ "Well", ",", "you", "look", "at", "places", "like", "Turkey", "." ], "text" : "Well, you look at places like Turkey." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Turkey", "has", "the", "death", "penalty" ], "text" : "Turkey has the death penalty" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "for", "just", "about", "everything", "." ], "text" : "for just about everything." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "if", "you", "get", "convicted", "of", ",", "uh", ",", "you", "know", ",", "drug", "trafficking", ",", "they", "just", "kill", "you", "." ], "text" : "I mean, if you get convicted of, uh, you know, drug trafficking, they just kill you." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "You", "get", "convicted", "of", ",", "uh", ",", "you", "know", ",", "heinous", "crimes", ",", "they", "just", "kill", "you", "." ], "text" : " You get convicted of, uh, you know, heinous crimes, they just kill you." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", "there", "'s", "no", "two", "ways", "about", "it", "." ], "text" : " I mean there's no two ways about it." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 30, "tokens" : [ "And", ",", "uh", ",", "you", "look", "at", "their", "society" ], "text" : "And, uh, you look at their society" }, { "speaker" : "B", "moc" : 28, "tokens" : [ "and", "the", "repeat", "offenders", "are", "very", "few", "." ], "text" : "and the repeat offenders are very few." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "You", "know", ",", "and", "you", "look", "at", "our", "society", ",", "almost", "everyone", "out", "on", "the", "street", "that", "has", "been", "in", "prison", ",", "has", "been", "in", "prison", "three", "or", "four", "times", "." ], "text" : " You know, and you look at our society, almost everyone out on the street that has been in prison, has been in prison three or four times." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Three", "or", "four", "times", "yeah", "." ], "text" : "Three or four times yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "I", "mean" ], "text" : "I mean" }, { "speaker" : "A", "moc" : 0, "tokens" : [ "That", "is", "true", "I", "know", "." ], "text" : "That is true I know." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Yeah", "." ], "text" : " Yeah." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "You", "know", ",", "the", "way", "to", "stop", "that", "kind", "of", "behavior", "is", ",", "is", "two-fold", "." ], "text" : "You know, the way to stop that kind of behavior is, is two-fold." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "One", ",", "you", "need", "to", "make", "it", "illegal", "for", "both", "parents", "to", "work", "while", "the", "kids", "are", "under", "seven", "." ], "text" : "One, you need to make it illegal for both parents to work while the kids are under seven." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "I", ",", "I", "think", "that", "'s", "very", "important", "." ], "text" : " I, I think that's very important." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Oh", ",", "I", "'m", ",", "I", "agree", "very", "much", "so", "on", "that" ], "text" : "Oh, I'm, I agree very much so on that" }, { "speaker" : "A", "moc" : 26, "tokens" : [ "I" ], "text" : "I" }, { "speaker" : "A", "moc" : 0, "tokens" : [ "yeah", "." ], "text" : "yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "And", "then", ",", "if", "a", "parent", "has", "proved", "to", "be", "unfit", ",", "for", "any", "reason" ], "text" : "And then, if a parent has proved to be unfit, for any reason" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "take", "the", "kids", "away", "from", "the", "parents", "." ], "text" : "take the kids away from the parents." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Because", ",", "you", "know", ",", "we", "are", "what", "we", "teach", "." ], "text" : "Because, you know, we are what we teach." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Because", "that", "'s", "what", "our", "society", "becomes", "." ], "text" : "Because that's what our society becomes." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "We", "have" ], "text" : "We have" }, { "speaker" : "A", "moc" : 0, "tokens" : [ "comes", "yeah", "." ], "text" : "comes yeah." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "We", "have", "just", "a", "bunch", "of", "people" ], "text" : "We have just a bunch of people" }, { "speaker" : "B", "moc" : 27, "tokens" : [ "and", "I", "'ve", ",", "and", "I", "'ve", ",", "I", "'ve", "lived", "in", "that", ",", "that", "environment", "for", "quite", "a", "few", "years", "when", "I", "was", "doing", "construction", "work", "." ], "text" : "and I've, and I've, I've lived in that, that environment for quite a few years when I was doing construction work." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "You", "know", ",", "and", "these", "guys", ",", "they", "come", "to", "work", "every", "morning", "and", "they", "'re", "stoned", "to", "the", "bone", "." ], "text" : " You know, and these guys, they come to work every morning and they're stoned to the bone." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "they", "'re", "so", "high", ",", "they", "could", "fly", "up", "to", "the", "top", "of", "that", "building", "and", "they", "work", "all", "day", "and", "they", "go", "home", "and", "they", "smoke", "their", "dope", "and", "drink", "their", "booze", "and", "shoot", "their", "drugs", "and", "when", "they", "run", "out", "of", "money", ",", "they", "go", "down", "to", "the", "corner", "store", "and", "pop", "the", "guy", "on", "the", "head", "and", "take", "his", "money", "and", "then", "they", "go", "back", "to", "work", "on", "Monday", "." ], "text" : " I mean, they're so high, they could fly up to the top of that building and they work all day and they go home and they smoke their dope and drink their booze and shoot their drugs and when they run out of money, they go down to the corner store and pop the guy on the head and take his money and then they go back to work on Monday." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 26, "tokens" : [ "And", ",", "the", "kids", "of", "these", "people", "MUMBLEx", "." ], "text" : "And, the kids of these people MUMBLEx." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Sure" ], "text" : "Sure" }, { "speaker" : "A", "moc" : 37, "tokens" : [ "they", "just", "think", "that", "'s", "the", "normal", "thing", "to", "do", ",", "do", "n't", "they", "..." ], "text" : "they just think that's the normal thing to do, don't they ..." }, { "speaker" : "B", "moc" : 10, "tokens" : [ "They", "'re", "sociopathic", "." ], "text" : "They're sociopathic." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", "I", "worked", "in", "a", "first", "grade", "classroom", "for", "one", "full", "semester" ], "text" : "And I worked in a first grade classroom for one full semester" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "and", "these", "kids", "were", "more", "foulmouthed", "than", "I", "'ve", "ever", "been", "." ], "text" : "and these kids were more foulmouthed than I've ever been." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "had", "one", "kid", "threaten", "my", "life" ], "text" : " I had one kid threaten my life" }, { "speaker" : "A", "moc" : 12, "tokens" : [ "In", "the", "first", "grade", "." ], "text" : "In the first grade." }, { "speaker" : "B", "moc" : 49, "tokens" : [ "Threaten", "my", "life", "." ], "text" : "Threaten my life." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Told", "me", "that", "daddy", "'s", "going", "to", "whoop", "me", "to", "death", "." ], "text" : "Told me that daddy's going to whoop me to death." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "Oh", ",", "know", "." ], "text" : "Oh, know." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "You", "know", ",", "and", "they", "flipping", "me", "the", "finger", "and", "all", "that" ], "text" : "You know, and they flipping me the finger and all that" }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "and", "I", "just", "said", "to", "this", "kid" ], "text" : "and I just said to this kid" }, { "speaker" : "B", "moc" : 52, "tokens" : [ "I", "said", ",", "you", "got", "two", "choices", "kid", "you", "can", "step", "into", "mainstream", "society", "or", "you", "can", "die", "." ], "text" : "I said, you got two choices kid you can step into mainstream society or you can die." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 52, "tokens" : [ "Because", "you", "will", "eventually", "be", "killed", "." ], "text" : "Because you will eventually be killed." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", ",", "I", "just", ",", "I", "'m", "just", "totally", "aghast", "at", "a", "what", "'s", "going", "on", "." ], "text" : "And, I just, I'm just totally aghast at a what's going on." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "Oh", ",", "I", "know", "." ], "text" : "Oh, I know." }, { "speaker" : "A", "moc" : 0, "tokens" : [ "I", "know", ",", "um" ], "text" : " I know, um" }, { "speaker" : "A", "moc" : 27, "tokens" : [ "I", "work", "in", "school", "." ], "text" : "I work in school." }, { "speaker" : "A", "moc" : 27, "tokens" : [ "You", "know", "that", "'s", "something", "I", "do" ], "text" : " You know that's something I do" }, { "speaker" : "A", "moc" : 26, "tokens" : [ "and", "I", ",", "it", "really", "is" ], "text" : "and I, it really is" }, { "speaker" : "A", "moc" : 28, "tokens" : [ "I", "'m", "like", "you", "astonishing", "what", "the", "younger", "ages", "know", "and", "they", "react", "to", "what", "they", "see", "at", "home", "." ], "text" : "I'm like you astonishing what the younger ages know and they react to what they see at home." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "You", "know", "." ], "text" : " You know." }, { "speaker" : "B", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "If", "they", "see", "violence", "at", "home", ",", "that", "'s", "what", "you", "'re", "going", "to", "get", "from", "the", "kids", "at", "school", "." ], "text" : "If they see violence at home, that's what you're going to get from the kids at school." }, { "speaker" : "B", "moc" : 0, "tokens" : [ "Exactly", "." ], "text" : "Exactly." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "You", "know", "." ], "text" : "You know." }, { "speaker" : "A", "moc" : 28, "tokens" : [ "It", "really", "is", "and", "that", "'s", "kind", "of", "sad", "." ], "text" : " It really is and that's kind of sad." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "Well", ",", "you", "can", "see", "it", "in", "the", "work", "place", ",", "you", "know", "." ], "text" : "Well, you can see it in the work place, you know." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Used", "to", "be", "when", "you", "had", "a", "personality", "conflict", "you", "just", ",", "you", "worked", "with", "it", "and", "you", "got", "through", "it", "." ], "text" : "Used to be when you had a personality conflict you just, you worked with it and you got through it." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Now", ",", "you", "know", ",", "people", "get", "fired", "or", "what", "'s", "even", "worse", ",", "is", "they", "promote", "them", "into", "a", "position", "that", "they", "ca", "n't", "handle", "and", "let", "them", "get", "fired", "." ], "text" : "Now, you know, people get fired or what's even worse, is they promote them into a position that they can't handle and let them get fired." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 48, "tokens" : [ "Or", ",", "one", "thing", "or", "the", "other", "." ], "text" : "Or, one thing or the other." }, { "speaker" : "B", "moc" : 30, "tokens" : [ "You", "look", "at", "another", "kind", "of", "society", "like", "the", "Japanese", "." ], "text" : "You look at another kind of society like the Japanese." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "You", "put", "that", "many", "people", "on", "that", "small", "of", "a", "space", ",", "they", "'ve", "learned", "to", "live", "together", "." ], "text" : "You put that many people on that small of a space, they've learned to live together." }, { "speaker" : "B", "moc" : 26, "tokens" : [ "Okay", "." ], "text" : "Okay." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "It", "'s", "in", "their", "culture", "." ], "text" : "It's in their culture." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 28, "tokens" : [ "And", "one", "of", "the", "things", "that", "'s", "in", "their", "culture", "that", "I", "really", "think", "the", "major", "corporations", "should", "pay", "attention", "to", ",", "is", "the", "fact", "that", ",", "while", "Japan", "was", "becoming", "a", "great", "power", ",", "financially", ",", "the", "people", "that", "worked", "for", "those", "companies", ",", "worked", "for", "the", "same", "company", "they", "worked", "for", "at", "sixty-five", ",", "as", "they", "did", "when", "they", "were", "eighteen", "." ], "text" : "And one of the things that's in their culture that I really think the major corporations should pay attention to, is the fact that, while Japan was becoming a great power, financially, the people that worked for those companies, worked for the same company they worked for at sixty-five, as they did when they were eighteen." }, { "speaker" : "A", "moc" : 16, "tokens" : [ "Teen", "." ], "text" : "Teen." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "And", "the", "company", ",", "took", "it", "upon", "itself", "to", "find", "a", "position", "for", "these", "people", "." ], "text" : "And the company, took it upon itself to find a position for these people." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "If", "they", "were", "n't", "fit", "for", "the", "job", "they", "were", "hired", "for", ",", "they", "did", "n't", "just", "can", "them", "they", "made", "a", "position", "for", "them", "some", "where", "." ], "text" : " If they weren't fit for the job they were hired for, they didn't just can them they made a position for them some where." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 30, "tokens" : [ "You", "look", "at", "Frito", "Lay", "." ], "text" : "You look at Frito Lay." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "My", "wife", "used", "to", "work", "for", "Frito", "Lay", "as", "a", "typist", "." ], "text" : "My wife used to work for Frito Lay as a typist." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "You", "know", ",", "transcribing", "stuff", "into", "the", "computer", "." ], "text" : " You know, transcribing stuff into the computer." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Huh-uh", "." ], "text" : "Huh-uh." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "Well", ",", "she", "could", "type", "about", "one-hundred", "and", "five", "words", "per", "minute", "but", "she", "do", "n't", "like", "it", "." ], "text" : "Well, she could type about one-hundred and five words per minute but she don't like it." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "She", "just", "does", "n't", "like", "to", "do", "that", "." ], "text" : " She just doesn't like to do that." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "I", "mean", ",", "she", "will", "." ], "text" : " I mean, she will." }, { "speaker" : "A", "moc" : 11, "tokens" : [ "Yeah", "." ], "text" : "Yeah." }, { "speaker" : "B", "moc" : 27, "tokens" : [ "But", ",", "you", "know", ",", "her", "preference", "is", "to", "be", "in", "an", "office", "situation", "where", "her", "job", "is", "..." ], "text" : "But, you know, her preference is to be in an office situation where her job is ..." } ] }
	
Template.displayConversation.onCreated(function(){

	// Load the conversation.
	text_example["convo"] = text_example["convo"].slice(0,40); // Take 40 examples only.
	this.conversation = new ReactiveVar(text_example)
	this.focused_uid = new ReactiveVar(0);
	this.expandedLength = new ReactiveVar(40);
	var _this = this;

	Meteor.call('getMOCTaxonomy', function(err, data) {
	  if(err) {
	  	console.log(err);
	    // Handle error
	  }
	  else {
	  	 Session.set('MOCTaxonomy', data);
	  }
	});

});

Template.displayConversation.events = {
	'click #next_utterance': function(){
		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		var expandedLength = Template.instance().expandedLength.get();

		var newid = Math.min(focused_uid + 1,  full_mongo_conv["convo"].length)
		Template.instance().focused_uid.set(newid);
		Template.instance().expandedLength.set(Math.max(newid, expandedLength));


		$('html,body').animate({
		  scrollTop: $('.focusedUtteranceText').offset().top +100
		}, 10);

		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop() + "px");
		});

	},
	'click #prev_utterance': function(){
		var focused_uid = Template.instance().focused_uid.get();
		newid = Math.max(focused_uid -1, 0)
		Template.instance().focused_uid.set(newid);

		$('html,body').animate({
		  scrollTop: $('.focusedUtteranceText').offset().top +100
		}, 10);

		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop()+ "px");
		});
	},
	'click .utteranceText': function(e, t){
		var newid = parseInt($(e.target)[0].id);
		Template.instance().focused_uid.set(newid);

		$('html,body').animate({
		  scrollTop: $('.focusedUtteranceText').offset().top +100
		}, 10);

		$(window).scroll(function() {
		    $('#utteranceAnnotationTool').css('top', $(this).scrollTop()+ "px");
		});
	},
	'click .selectCategory':  function(e, t) {
		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		var taxonomy = Session.get("MOCTaxonomy");
		var conv = full_mongo_conv["convo"];

		utterance = conv[focused_uid];
		button_object = $(e.target)[0];
		tax_choice = button_object["value"];

		utterance["annotationData"].push(tax_choice);

		//Check to see if label was sucessful!
		annotationData = utterance['annotationData'];
		categories = taxonomy;
		for(i = 0; i < annotationData.length; i++){
			categories = categories[annotationData[i]];
		}

		annotationComplete = typeof categories === "string" || categories instanceof String

		if(annotationComplete)
			utterance["mocLabel"] = utterance['annotationData']
		else
			utterance["mocLabel"] = null;

		Template.instance().conversation.set(full_mongo_conv);
	},
	'click .unselectCategory':  function(e, t) {
		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		var conv = full_mongo_conv["convo"];

		utterance = conv[focused_uid];
		button_object = $(e.target)[0];
		tax_choice = button_object["text"];

		if(tax_choice == "Root"){
			utterance["annotationData"] = [];
		}
		else{
			aData = utterance["annotationData"];
			var cut_to = 0;
			for(i = 0; i < aData.length; i++, cut_to++){
				if(aData[i] ==  tax_choice)
					break;
			}
			utterance["annotationData"] = aData.slice(0, cut_to+1);
		}

		Template.instance().conversation.set(full_mongo_conv);
	}
}

Template.displayConversation.helpers({
	conversationData: function() {
		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		var expandedLength = Template.instance().expandedLength.get();

		var conv = full_mongo_conv["convo"];
		var contracted_conv = [];
		var curspeaker = "";
		var curcontract = null;

		// Contract the conversation.
		for(i = 0; i < conv.length && i <= expandedLength; i++){
			var utterance = conv[i];
			if(curspeaker != utterance.speaker){
				curspeaker = utterance.speaker;
				if(curcontract != null){
					contracted_conv.push(curcontract);
				}

				curcontract = {
					"speaker": curspeaker,
					"subexpressions": []
				};
			}
			utterance.focused = i == focused_uid;
			utterance.id = i;

			curcontract["subexpressions"].push(utterance);
		}
		// Finally push the last contraciton.
		if(curcontract != null){
			contracted_conv.push(curcontract);
		}

		return contracted_conv;
	},
	taskComplete: function() {
		var full_mongo_conv =  Template.instance().conversation.get();
		var conv = full_mongo_conv["convo"];
		for(i = 0; i < conv.length; i++){
			var utterance = conv[i];
			if(!utterance.hasOwnProperty('mocLabel'))
				return false;
		}
		return true;
	},
	focusedUtterance: function(){
		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		return full_mongo_conv["convo"][focused_uid];
	},
	mocTaxonomy: function(){
		var taxonomy = Session.get("MOCTaxonomy");

		var full_mongo_conv =  Template.instance().conversation.get();
		var focused_uid = Template.instance().focused_uid.get();
		var conv = full_mongo_conv["convo"];
		utterance = conv[focused_uid];

		if(!utterance.hasOwnProperty('annotationData')){
			utterance['annotationData'] = [];
		}

		annotationData = utterance['annotationData'];
		categories = taxonomy;
		for(i = 0; i < annotationData.length; i++){
			categories = categories[annotationData[i]];
		}

		// Check if there do not exist subcategories.
		if(typeof categories === "string" || categories instanceof String)
			categories = [];
		else
			categories = Object.keys(categories);

		// TODO: Build recursive structure on taxonomy component.
		return {
			"categories": categories,
			"parents": ["Root"].concat(
				annotationData.slice(0,annotationData.length-1)),
			"curmoc": annotationData[annotationData.length-1]
		}
	},
	getUtteranceStyle: function(utterance){
		styles = "utteranceText ";

		if(!!utterance.focused)
			styles += " focusedUtteranceText";
		if(!!utterance.mocLabel)
			styles += " completedUtteranceText";
		else if(!!utterance.annotationData && utterance.annotationData.length > 0)
			styles += " incompleteUtteranceText";
		return styles;
	}

});

