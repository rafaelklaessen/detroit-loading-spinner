# detroit-loading-spinner

Loading spinner based on the loading spinner in the popular video game [Detroit: Become Human](https://en.wikipedia.org/wiki/Detroit:_Become_Human).

![Loading spinner screenshot](https://github.com/rafaelklaessen/detroit-loading-spinner/raw/master/screenshots/screenshot.png "Screenshot of the loading spinner")

## Usage
```javascript
import Spinner from 'detroit-loading-spinner';

const App = () => (
  <Spinner />
);

export default App;
```

## Props
`detroit-loading-spinner` accepts the following props:

Prop name | Description | Type | Default value
--------- | ----------- | ---- | -------------
`size` | Size of the spinner | `number` | `150`
`color` | Color of the spinner | `string` | `#58728D`
`segments` | Amount of segments in spinner | `number` | `4`
`segmentMax` | Maximum size (in percents) of one spinner segment | `number` | `65`
`padding` | Space between the spinner segments | `number` | `2`
`cornerRadius` | Corner radius of the spinner segments | `number` | `20`

Undocumented props are passed on the root element.


## License
MIT
