// swiftlint:disable all
import Amplify
import Foundation

public struct User: Model {
  public let id: String
  public var username: String
  public var isSafe: Bool?
  
  public init(id: String = UUID().uuidString,
      username: String,
      isSafe: Bool? = nil) {
      self.id = id
      self.username = username
      self.isSafe = isSafe
  }
}