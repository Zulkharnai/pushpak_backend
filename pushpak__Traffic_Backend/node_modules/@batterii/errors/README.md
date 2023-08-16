# @batterii/errors
Contains base error classes for errors defined in the Batterii organization.

Makes use of [Nani][1] to enable easy and robust run-time checking against error
type heirarchies, which is usually not possible in JavaScript or, by extension,
TypeScript.

This exists primarily for [namespacing purposes][2] and will likely only ever
contain a single class, `BatteriiError`, which should be the base class for
every error defined in any package with the Batterii scope, or any open-source
package we might end up having that is maintained by Batterii but is not
released under the scope.

If we publish (either publicly or privately) a package called
`@batterii/encode-object`, for example, any errors it defines should derive from
an `EncodeObjectError`, which in turn derives from `BatteriiError`.

[1]: https://www.npmjs.com/package/nani
[2]: https://www.npmjs.com/package/nani#namespacing-your-errors
