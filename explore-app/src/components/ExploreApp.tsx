import { useEffect, useState } from "react";
import { API_KEY } from "../private/api";
import { ControlledInput } from "./ControlledInput";
import { get } from "http";

export function ExploreApp() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const [zipcode, setZipcode] = useState<string>("");

  const [place, setPlace] = useState<string>("");

  // useEffect with empty dependency array -- quote only needs to load once upon page render
  useEffect(() => {
    // BUG: useEffect running twice, from App (React StrictMode)
    // Outside of this, REPL should call ExploreApp directly, and App should just call REPL
    async function fetchRandomAdventureQuote() {
      const fetchRandomQuote = await fetch(
        "https://api.quotable.io/random?tags=Imagination|creativity|wisdom"
      );
      const quoteJson = await fetchRandomQuote.json();
      console.log(quoteJson);
      setQuote(quoteJson.content);
      setAuthor(quoteJson.author);
    }
    fetchRandomAdventureQuote();
    console.log("once");
  }, []);

  // getting same place with same zipcode, not randomly choosing a place when limit set to 1
  async function getPlaceIdandPlace(place: string) {
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
    const placeId = placeIdJson.results[0].place_id;

    console.log("place id in submitplace: " + placeId);
    const fetchRandomPlace = await fetch(
      "https://api.geoapify.com/v2/places?categories=leisure,tourism,activity,entertainment&filter=place:" +
        placeId +
        "&limit=1&apiKey=" +
        API_KEY
    );
    const placeJson = await fetchRandomPlace.json();
    console.log("placejson: " + placeJson);
    console.log("place: " + placeJson.features[0].properties.formatted);

    setPlace(placeJson.features[0].properties.formatted);
  }

  function submitPlace(place: string) {
    getPlaceIdandPlace(place);
  }

  return (
    <div>
      <h2>
        "{quote}"<br />- {author}
      </h2>
      <fieldset>
        <legend> Enter the zipcode you would like to explore! </legend>
        <ControlledInput
          value={zipcode}
          setValue={setZipcode}
          ariaLabel={"Password input"}
        />
      </fieldset>
      <button onClick={() => submitPlace(zipcode)}>Submit!</button>
      <p>{place} awaits!</p>
    </div>
  );
}
