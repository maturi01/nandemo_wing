\version "2.18.2"

\header {
	title = "untitled"
}

global = {
	%\tempo 4 = 108
	\tempo 4 = 180 % Gabber
	\time 4/4
	\key c \major
}

insA = \relative c' {
	\set Staff.midiInstrument = #"acoustic grand"
	\clef treble

	r2 f4 g~ |
	g4 f8 e d2~ |
	d2. e4 |
	f1~ |
	f4 g a g |
	f2. g4
	f2 e |
	d1 |
}

insASong = \lyricmode {
}

drumA = \drummode{ bd4 bd bd bd } %4/4
drum = {
	\repeat volta 7 \drumA
}

bass = \relative c {
	\set Staff.midiInstrument = #"acoustic grand"
	\clef bass

	d1~ |
	d~ |
	d~ |
	d~ |
	d~ |
	d~ |
	d~ |
	d~ |
}

\score{
<<
	\new Staff <<
		\global
		\new Voice  = "insAVoice" \insA
%		\new Lyrics \lyricsto "insAVoice" \insASong
	>>
	\new Staff << \global \bass >>
%	\new DrumStaff { \unfoldRepeats \drum }
>>
	\layout{}
	\midi{}
}
