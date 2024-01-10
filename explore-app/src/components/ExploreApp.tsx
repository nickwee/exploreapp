import { useEffect, useState } from "react";
import { API_KEY } from "../private/api";
import { ControlledInput } from "./ControlledInput";

export function ExploreApp() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const [place, setPlace] = useState<string>("");

  // useEffect with empty dependency array -- quote only needs to load once upon page render
  useEffect(() => {
    fetchRandomAdventureQuote();
    console.log("once");
  }, []);

  // BUG: useEffect running twice, from App
  async function fetchRandomAdventureQuote() {
    const fetchRandomQuote = await fetch(
      "https://api.quotable.io/random?tags=Imagination|creativity|wisdom"
    );
    const quoteJson = await fetchRandomQuote.json();
    console.log(quoteJson);
    setQuote(quoteJson.content);
    setAuthor(quoteJson.author);
  }

  async function getPlaceId(place: string) {
    console.log("zipcode: " + place);
    const fetchPlaceId = await fetch(
      "https://api.geoapify.com/v1/geocode/search?text=" +
        place +
        "&limit=1&format=json&apiKey=" +
        API_KEY
    );
    const placeIdJson = await fetchPlaceId.json();
    console.log("place id json: " + placeIdJson);
    console.log("place id: " + placeIdJson.results[0].place_id);
    return placeIdJson.results[0].place_id;
  }

  async function submitPlace(place: string) {
    getPlaceId(place);
    // const placeId = getPlaceId(place);
    // console.log("place id in submitplace: " + placeId);
    // const fetchRandomPlace = await fetch(
    //   "https://api.geoapify.com/v2/places?categories=leisure,tourism,activity,entertainment&filter=place:" +
    //     placeId +
    //     "&limit=1&apiKey=" +
    //     API_KEY
    // );
    // const placeJson = await fetchRandomPlace.json();
    // console.log("placejson: " + placeJson);
    // console.log("place: " + placeJson.features[0].properties.name);
  }

  return (
    <div>
      {/* Main app functionality goes here */}
      <h2>
        "{quote}"<br />- {author}
      </h2>
      <fieldset>
        <legend> Enter the zipcode you would like to explore! </legend>
        <ControlledInput
          value={place}
          setValue={setPlace}
          ariaLabel={"Password input"}
        />
      </fieldset>
      <button onClick={() => submitPlace(place)}>Submit!</button>
    </div>
  );
}
