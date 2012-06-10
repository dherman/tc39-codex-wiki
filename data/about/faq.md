---
  title: Frequently Asked Questions
---

# Frequently Asked Questions

  * [What is One JavaScript (1JS)?](#onejs)
  * [Why don't we remove or fix bad features?](#breaking)
  * [Why don't we make breaking changes with a language version?](#optin)
  * [Why don't we deprecate features?](#deprecate)
  * [How can we use new syntax on old browsers?](#syntax)
  * [When will the next version of JavaScript be available?](#rollout)
  * [Will we add new restrictions to strict mode?](#strict)
  * [Why don't we standardize a bytecode VM?](#bytecode)
  * [Classes? Is JavaScript becoming Java?](#classes)
  * [How do we avoid design-by-committee?](#harmony)
  * [Do all those design sketches mean JS will get bloated?](#sketches)
  * [How can I suggest a feature?](#suggestions)
  * [I'm nervous about posting to es-discuss. Any advice?](#es-discuss)
  * [How do you spell JavaScript? ECMAScript? Ecma?](#spelling)

## <a id="onejs"></a>What is One JavaScript (1JS)?

One JavaScript, or 1JS for short, means avoiding splintering JavaScript by making each version backwards-compatible with the previous versions. We evolve the language by adding new API's and new syntax. We don't change the behavior of existing features, and we don't add new modes or versions.

  * The original [One JavaScript proposal](https://mail.mozilla.org/pipermail/es-discuss/2011-December/019112.html)

## <a id="breaking"></a>Why don't we remove or fix bad features?

If we did, existing web content would break. No browser vendor is willing to be the first to make such changes, because a rational end user perceives them as browser bugs and switches to a different browser.

The only time we can make an incompatible change is if the web happens not to depend on it. There's no way to know for sure whether this is the case except by experimenting. Browser vendors can take a chance by making an incompatible change in alpha or beta versions of their browsers and seeing whether they get any bug reports about breaking content.

## <a id="optin"></a>Why don't we make breaking changes with a language version?

Opt-in versioning has a bad track record on the web. VBScript, JavaScript 1.2, and XHTML are good examples.

Versions or modes may sound appealing, but they have the wrong defaults: an unspecified version (e.g., in a `script` tag or an inline attribute) always gets the old version&mdash;to get an improved language you always have to specify a version. It's not even possible to specify a language version in an inline HTML attribute. Maybe worst of all, adding modes or versions adds a dimension to the platform matrix for application testing and tracking platform feature availability.

For all these reasons, opt-in versioning faces an uphill adoption battle. It's also a huge implementation and testing burden on platform vendors&mdash;it increases their set of sub-platforms exponentially&mdash;so browser vendors typically oppose new modes.

## <a id="deprecate"></a>Why don't we deprecate features?

Deprecation doesn't work on the web. Since we [can't remove bad features](#breaking), a developer has little incentive to stop using a feature just because somebody somewhere doesn't like it. Labeling features "deprecated" without ever removing them is pointless.

## <a id="syntax"></a>How can we use new syntax on old browsers?

New syntax takes a while to reach enough users that developers can start using it. However, adding syntax to JavaScript has historically been successful, even if it's slow. An example is `try`/`catch`, which was introduced in ES3 (1999). It took years before widely-deployed applications could use it, but it's now a full-fledged part of the web platform.

A good approach to using new syntax on old browsers is to use a "transpiler" to compile new features to old versions of JavaScript. Google's [Traceur compiler](http://code.google.com/p/traceur-compiler/) is an experimental project to do this for ES6.

## <a id="rollout"></a>When will the next version of JavaScript be available?

ECMAScript Edition 6 is targeting a 2013 spec release, but browsers are already implementing individual features.

Sites like [Can I Use](http://caniuse.com) and [HTML5 Please](http://html5please.com) track the release and availability of features on the web platform. Hopefully these sites or others like them can track individual features of ES6 as well.

## <a id="strict"></a>Will we add new restrictions to strict mode?

No. Strict mode was a one-time event to fix some of the problems in ES3. Going forward, [modules](/proposals/modules) will automatically be strict, making it less necessary to opt in to strict mode explicitly to get these fixes. But the goal of [One JavaScript](#onejs) is to avoid any more language fixes with modes.

## <a id="bytecode"></a>Why don't we standardize a bytecode VM?

## <a id="classes"></a>Classes? Is JavaScript becoming Java?

## <a id="harmony"></a>How do we avoid design-by-committee?

## <a id="sketches"></a>Do all those design sketches mean JS will get bloated?

## <a id="suggestions"></a>How can I suggest a feature?

## <a id="es-discuss"></a>I'm nervous about posting to [es-discuss](https://mail.mozilla.org/listinfo/es-discuss). Any advice?

Just keep it short and constructive. Everyone is welcome to contribute or provide feedback.

If you aren't sure exactly what the solution or design you have in mind should look like, don't worry: just describe the *problem* you perceive. Feedback from developers about common problems can be particularly valuable.

Also: please trim cited text to only the relevant parts (Gmail users: the UI hides cited text from you but it's still there&mdash;please unhide and trim!).

## <a id="spelling"></a>How do you spell JavaScript? ECMAScript? Ecma?

JavaScript, ECMAScript, and Ecma.

Don't ask.
